"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface ViewfinderScreenProps {
  onCapture: (imageData: string) => void;
  onBack: () => void;
}

const FRAME_W = 1074;
const FRAME_H = 1662;
const CUTOUT_X = 60;
const CUTOUT_Y = 60;
const CUTOUT_W = 954;
const CUTOUT_H = 1248;

export default function ViewfinderScreen({ onCapture, onBack }: ViewfinderScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameImgRef = useRef<HTMLImageElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/frame-overlay.png";
    img.onload = () => { frameImgRef.current = img; };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1080 }, height: { ideal: 1440 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraReady(true);
        }
      } catch {
        if (!cancelled) {
          setCameraError(
            "Camera access is needed for the photo booth. Please allow camera access in your browser settings and refresh."
          );
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const frameImg = frameImgRef.current;
    if (!video || !canvas || !frameImg) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;

    const cutoutAspect = CUTOUT_W / CUTOUT_H;
    let cropW: number, cropH: number;
    if (vw / vh > cutoutAspect) {
      cropH = vh;
      cropW = vh * cutoutAspect;
    } else {
      cropW = vw;
      cropH = vw / cutoutAspect;
    }
    const sx = (vw - cropW) / 2;
    const sy = (vh - cropH) / 2;

    canvas.width = FRAME_W;
    canvas.height = FRAME_H;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, FRAME_W, FRAME_H);

    ctx.save();
    ctx.translate(CUTOUT_X + CUTOUT_W, CUTOUT_Y);
    ctx.scale(-1, 1);
    ctx.drawImage(video, sx, sy, cropW, cropH, 0, 0, CUTOUT_W, CUTOUT_H);
    ctx.restore();

    ctx.drawImage(frameImg, 0, 0, FRAME_W, FRAME_H);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    onCapture(dataUrl);
  }, [onCapture]);

  const handleShutter = useCallback(() => {
    if (countdown !== null) return;
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        setFlash(true);
        setTimeout(() => {
          setFlash(false);
          capturePhoto();
        }, 250);
      }
    }, 1000);
  }, [countdown, capturePhoto]);

  if (cameraError) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-canada-red text-white px-8 text-center">
        <p className="text-5xl mb-6">📷</p>
        <p className="text-lg mb-6">{cameraError}</p>
        <button
          onClick={onBack}
          className="text-canada-red bg-white font-semibold px-6 py-3 rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-canada-red relative">
      <canvas ref={canvasRef} className="hidden" />

      {/* Frame + camera area */}
      <div className="flex-1 flex items-center justify-center px-4 pt-4 pb-2">
        <div
          className="relative w-full max-w-[340px]"
          style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
        >
          {/* Camera feed behind the frame */}
          <div
            className="absolute bg-gray-800 overflow-hidden"
            style={{
              left: `${(CUTOUT_X / FRAME_W) * 100}%`,
              top: `${(CUTOUT_Y / FRAME_H) * 100}%`,
              width: `${(CUTOUT_W / FRAME_W) * 100}%`,
              height: `${(CUTOUT_H / FRAME_H) * 100}%`,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
            />
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span
                  key={countdown}
                  className="text-8xl font-bold text-white drop-shadow-lg animate-countdown-pop"
                >
                  {countdown}
                </span>
              </div>
            )}
          </div>

          {/* Frame overlay */}
          <img
            src="/frame-overlay.png"
            alt=""
            className="absolute inset-0 w-full h-full pointer-events-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center py-6 gap-6">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-canada-red-dark text-white flex items-center justify-center text-xl font-bold"
          aria-label="Go back"
        >
          ✕
        </button>
        <button
          onClick={handleShutter}
          disabled={!cameraReady || countdown !== null}
          className="w-20 h-20 rounded-full bg-canada-red-dark flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
          aria-label="Take photo"
        >
          <div className="w-[66px] h-[66px] rounded-full border-4 border-white" />
        </button>
        <div className="w-12 h-12" />
      </div>

      {flash && (
        <div className="absolute inset-0 bg-white animate-flash pointer-events-none z-50" />
      )}
    </div>
  );
}
