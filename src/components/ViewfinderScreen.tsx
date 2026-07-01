"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import PolaroidFrame from "./PolaroidFrame";

interface ViewfinderScreenProps {
  onCapture: (imageData: string) => void;
  onBack: () => void;
}

export default function ViewfinderScreen({ onCapture, onBack }: ViewfinderScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

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
    if (!video || !canvas) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;

    const frameAspect = 3 / 4;
    let cropW: number, cropH: number;
    if (vw / vh > frameAspect) {
      cropH = vh;
      cropW = vh * frameAspect;
    } else {
      cropW = vw;
      cropH = vw / frameAspect;
    }
    const sx = (vw - cropW) / 2;
    const sy = (vh - cropH) / 2;

    const outputW = 1080;
    const outputH = 1440;
    const borderSide = 36;
    const borderTop = 36;
    const borderBottom = 156;

    canvas.width = outputW + borderSide * 2;
    canvas.height = outputH + borderTop + borderBottom;

    const ctx = canvas.getContext("2d")!;

    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = "transparent";

    ctx.save();
    ctx.translate(borderSide + outputW, borderTop);
    ctx.scale(-1, 1);
    ctx.drawImage(video, sx, sy, cropW, cropH, 0, 0, outputW, outputH);
    ctx.restore();

    const textY = outputH + borderTop + borderBottom / 2 + 8;
    ctx.fillStyle = "#888888";
    ctx.font = "500 28px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Happy Canada Day 🍁", canvas.width / 2, textY);

    drawMapleLeaf(ctx, canvas.width / 2 - 140, textY - 20, 18, "rgba(216,6,33,0.5)");
    drawMapleLeaf(ctx, canvas.width / 2 + 122, textY - 20, 18, "rgba(216,6,33,0.5)");

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
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white px-8 text-center">
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
    <div className="h-full flex flex-col bg-gray-900 relative">
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex-1 flex items-center justify-center p-4 pb-0">
        <PolaroidFrame className="w-full max-w-[340px]">
          <div className="relative aspect-[3/4] bg-gray-800">
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
        </PolaroidFrame>
      </div>

      <div className="flex items-center justify-center py-6 gap-6">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center text-xl"
          aria-label="Go back"
        >
          ✕
        </button>
        <button
          onClick={handleShutter}
          disabled={!cameraReady || countdown !== null}
          className="w-20 h-20 rounded-full bg-white border-4 border-canada-red flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
          aria-label="Take photo"
        >
          <div className="w-16 h-16 rounded-full bg-canada-red" />
        </button>
        <div className="w-12 h-12" />
      </div>

      {flash && (
        <div className="absolute inset-0 bg-white animate-flash pointer-events-none z-50" />
      )}
    </div>
  );
}

function drawMapleLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(x, y);
  const s = size / 50;
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(50, 3);
  ctx.lineTo(54, 18);
  ctx.lineTo(63, 10);
  ctx.lineTo(60, 25);
  ctx.lineTo(75, 20);
  ctx.lineTo(65, 32);
  ctx.lineTo(80, 35);
  ctx.lineTo(67, 40);
  ctx.lineTo(82, 50);
  ctx.lineTo(65, 48);
  ctx.lineTo(72, 62);
  ctx.lineTo(55, 52);
  ctx.lineTo(55, 68);
  ctx.lineTo(50, 58);
  ctx.lineTo(45, 68);
  ctx.lineTo(45, 52);
  ctx.lineTo(28, 62);
  ctx.lineTo(35, 48);
  ctx.lineTo(18, 50);
  ctx.lineTo(33, 40);
  ctx.lineTo(20, 35);
  ctx.lineTo(35, 32);
  ctx.lineTo(25, 20);
  ctx.lineTo(40, 25);
  ctx.lineTo(37, 10);
  ctx.lineTo(46, 18);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(47, 65, 6, 20);
  ctx.restore();
}
