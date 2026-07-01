"use client";

import { useState } from "react";
import LandingScreen from "@/components/LandingScreen";
import ViewfinderScreen from "@/components/ViewfinderScreen";
import ReviewScreen from "@/components/ReviewScreen";

type Screen = "landing" | "viewfinder" | "review";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  return (
    <main className="h-full">
      {screen === "landing" && (
        <LandingScreen onStart={() => setScreen("viewfinder")} />
      )}
      {screen === "viewfinder" && (
        <ViewfinderScreen
          onCapture={(img) => {
            setCapturedImage(img);
            setScreen("review");
          }}
          onBack={() => setScreen("landing")}
        />
      )}
      {screen === "review" && capturedImage && (
        <ReviewScreen
          imageData={capturedImage}
          onRetake={() => {
            setCapturedImage(null);
            setScreen("viewfinder");
          }}
        />
      )}
    </main>
  );
}
