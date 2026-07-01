import MapleLeaf from "./MapleLeaf";

interface PolaroidFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function PolaroidFrame({ children, className = "" }: PolaroidFrameProps) {
  return (
    <div
      className={`relative bg-white rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.25)] ${className}`}
      style={{
        padding: "12px 12px 52px 12px",
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-[1px]">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[52px] flex items-center justify-center gap-2 px-4">
        <MapleLeaf className="w-4 h-4 text-canada-red opacity-60" />
        <span className="text-[13px] text-gray-500 font-medium tracking-wide">
          Happy Canada Day 🍁
        </span>
        <MapleLeaf className="w-4 h-4 text-canada-red opacity-60" />
      </div>
    </div>
  );
}
