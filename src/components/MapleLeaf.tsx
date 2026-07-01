export default function MapleLeaf({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 3L54 18L63 10L60 25L75 20L65 32L80 35L67 40L82 50L65 48L72 62L55 52L55 68L50 58L45 68L45 52L28 62L35 48L18 50L33 40L20 35L35 32L25 20L40 25L37 10L46 18Z" />
      <rect x="47" y="65" width="6" height="20" rx="1" />
    </svg>
  );
}
