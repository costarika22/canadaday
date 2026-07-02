interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="h-full flex flex-col items-center bg-canada-red text-white relative overflow-hidden">
      <div className="flex flex-col items-center pt-16 pb-6 px-8 relative z-10">
        <img
          src="/maple-leaf.png"
          alt=""
          className="w-16 h-16 mb-6 drop-shadow-md animate-spin-slow"
          draggable={false}
        />

        <img
          src="/landing-text.png"
          alt="Canada Day Photo Booth"
          className="w-full max-w-[320px] mb-8 drop-shadow-sm"
          draggable={false}
        />

        <button
          onClick={onStart}
          className="bg-white text-canada-red font-bold text-xl uppercase tracking-wider px-14 py-5 rounded-full shadow-lg active:scale-95 transition-transform"
          style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        >
          Open Camera
        </button>
      </div>

      <div className="flex-1" />

      <div className="w-full relative z-10 mt-auto flex justify-center">
        <img
          src="/beaver.png"
          alt="Beaver mascot"
          className="w-full max-w-[340px]"
          draggable={false}
        />
      </div>
    </div>
  );
}
