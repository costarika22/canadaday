"use client";

import { useCallback } from "react";

interface ReviewScreenProps {
  imageData: string;
  onRetake: () => void;
}

export default function ReviewScreen({ imageData, onRetake }: ReviewScreenProps) {
  const handleSave = useCallback(() => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "canada-day-photo.jpg";
    link.click();
  }, [imageData]);

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
    handleSave();
  }, [imageData, handleSave]);

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="flex-1 flex items-center justify-center p-4 pb-0 overflow-hidden">
        <img
          src={imageData}
          alt="Your Canada Day photo"
          className="max-w-full max-h-full object-contain rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        />
      </div>

      <div className="flex items-center justify-center gap-4 py-6 px-4">
        <button
          onClick={onRetake}
          className="flex-1 max-w-[120px] bg-white/20 text-white font-semibold py-3 rounded-full text-center active:scale-95 transition-transform"
        >
          Retake
        </button>
        <button
          onClick={handleSave}
          className="flex-1 max-w-[120px] bg-white text-gray-900 font-semibold py-3 rounded-full text-center active:scale-95 transition-transform"
        >
          Save
        </button>
        <button
          onClick={handleShare}
          className="flex-1 max-w-[120px] bg-canada-red text-white font-semibold py-3 rounded-full text-center active:scale-95 transition-transform"
        >
          Share
        </button>
      </div>
    </div>
  );
}
