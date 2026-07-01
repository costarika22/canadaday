"use client";

import { useCallback } from "react";

interface ReviewScreenProps {
  imageData: string;
  onRetake: () => void;
}

export default function ReviewScreen({ imageData, onRetake }: ReviewScreenProps) {
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        const res = await fetch(imageData);
        const blob = await res.blob();
        const file = new File([blob], "canada-day-photo.jpg", { type: "image/jpeg" });
        await navigator.share({ files: [file] });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "canada-day-photo.jpg";
    link.click();
  }, [imageData]);

  return (
    <div className="h-full flex flex-col bg-canada-red">
      {/* Photo display */}
      <div className="flex-1 flex items-center justify-center px-4 pt-4 pb-2 overflow-hidden">
        <img
          src={imageData}
          alt="Your Canada Day photo"
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4 py-8 px-6">
        <button
          onClick={onRetake}
          className="flex-1 max-w-[160px] bg-canada-red-dark text-white font-bold text-lg uppercase tracking-wider py-4 rounded-full active:scale-95 transition-transform"
          style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        >
          Retake
        </button>
        <button
          onClick={handleShare}
          className="flex-1 max-w-[160px] bg-white text-canada-red font-bold text-lg uppercase tracking-wider py-4 rounded-full active:scale-95 transition-transform"
          style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        >
          Share
        </button>
      </div>
    </div>
  );
}
