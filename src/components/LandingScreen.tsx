import MapleLeaf from "./MapleLeaf";

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-canada-red text-white px-8 relative overflow-hidden">
      <div className="absolute top-8 left-6 animate-float opacity-20">
        <MapleLeaf className="w-16 h-16" />
      </div>
      <div className="absolute top-20 right-8 animate-float opacity-15" style={{ animationDelay: "1s" }}>
        <MapleLeaf className="w-12 h-12" />
      </div>
      <div className="absolute bottom-24 left-10 animate-float opacity-15" style={{ animationDelay: "2s" }}>
        <MapleLeaf className="w-10 h-10" />
      </div>
      <div className="absolute bottom-40 right-6 animate-float opacity-20" style={{ animationDelay: "0.5s" }}>
        <MapleLeaf className="w-14 h-14" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <MapleLeaf className="w-20 h-20 mb-6 drop-shadow-lg" />
        <h1 className="text-4xl font-bold mb-3 drop-shadow-sm">
          Happy Canada Day!
        </h1>
        <p className="text-lg opacity-90 mb-2">🍁</p>
        <p className="text-lg opacity-90 mb-10">
          Take a festive photo!
        </p>
        <button
          onClick={onStart}
          className="bg-white text-canada-red font-bold text-xl px-10 py-4 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          📸 Open Camera
        </button>
      </div>
    </div>
  );
}
