interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="h-full flex flex-col items-center bg-canada-red text-white relative overflow-hidden">
      <div className="flex flex-col items-center pt-16 pb-6 px-8 relative z-10">
        {/* Maple leaf */}
        <svg viewBox="0 0 200 200" className="w-16 h-16 mb-6 drop-shadow-md" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 10 L108 52 L122 36 L116 62 L148 48 L130 72 L158 76 L134 86 L162 104 L132 98 L142 126 L114 106 L114 140 L100 118 L86 140 L86 106 L58 126 L68 98 L38 104 L66 86 L42 76 L70 72 L52 48 L84 62 L78 36 L92 52Z" />
          <rect x="94" y="135" width="12" height="40" rx="2" />
        </svg>

        <h1
          className="text-[2.8rem] leading-[1.05] font-black text-center tracking-wide mb-2 drop-shadow-sm"
          style={{ fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif" }}
        >
          CANADA DAY
        </h1>
        <h2
          className="text-[2.2rem] leading-[1.1] font-black text-center tracking-wide mb-8 drop-shadow-sm"
          style={{ fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif" }}
        >
          PHOTO BOOTH
        </h2>

        <button
          onClick={onStart}
          className="bg-white text-canada-red font-black text-xl uppercase tracking-wider px-14 py-5 rounded-full shadow-lg active:scale-95 transition-transform"
          style={{ fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif" }}
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
