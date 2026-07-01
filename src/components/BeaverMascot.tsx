export default function BeaverMascot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 420" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Confetti */}
      <rect x="60" y="80" width="6" height="14" rx="1" fill="#FF6B8A" transform="rotate(-20 63 87)" />
      <rect x="100" y="50" width="5" height="12" rx="1" fill="#4FC3F7" transform="rotate(15 102 56)" />
      <rect x="310" y="70" width="6" height="14" rx="1" fill="#FFD54F" transform="rotate(25 313 77)" />
      <rect x="340" y="110" width="5" height="12" rx="1" fill="#81C784" transform="rotate(-10 342 116)" />
      <rect x="280" y="40" width="5" height="12" rx="1" fill="#FF8A65" transform="rotate(30 282 46)" />
      <rect x="150" y="30" width="4" height="10" rx="1" fill="#CE93D8" transform="rotate(-25 152 35)" />
      <rect x="250" y="90" width="6" height="14" rx="1" fill="#4FC3F7" transform="rotate(20 253 97)" />
      <rect x="50" y="160" width="5" height="12" rx="1" fill="#FFD54F" transform="rotate(35 52 166)" />
      <rect x="355" y="170" width="4" height="10" rx="1" fill="#FF6B8A" transform="rotate(-15 357 175)" />
      <circle cx="130" cy="60" r="3" fill="#FFD54F" />
      <circle cx="290" cy="55" r="3" fill="#81C784" />
      <circle cx="70" cy="130" r="2.5" fill="#CE93D8" />
      <circle cx="350" cy="140" r="2.5" fill="#4FC3F7" />

      {/* Canadian flag - left side */}
      <g transform="translate(45, 140)">
        {/* Flag pole */}
        <line x1="55" y1="0" x2="55" y2="180" stroke="#8B6914" strokeWidth="3.5" strokeLinecap="round" />
        {/* Flag */}
        <g transform="translate(0, 5)">
          <rect x="57" y="0" width="75" height="48" rx="1" fill="#FF0000" />
          <rect x="72" y="0" width="45" height="48" fill="#FFFFFF" />
          {/* Maple leaf on flag */}
          <g transform="translate(94.5, 24) scale(0.22)">
            <path d="M0,-60 L8,-20 L35,-35 L22,-5 L50,-12 L35,10 L58,15 L38,25 L60,45 L32,38 L38,65 L15,45 L0,70 L-15,45 L-38,65 L-32,38 L-60,45 L-38,25 L-58,15 L-35,10 L-50,-12 L-22,-5 L-35,-35 L-8,-20Z" fill="#FF0000" />
          </g>
        </g>
        {/* Gold ball on top */}
        <circle cx="55" cy="0" r="4" fill="#DAA520" />
      </g>

      {/* Small Canadian flag - bottom left */}
      <g transform="translate(15, 310)">
        <line x1="30" y1="0" x2="30" y2="90" stroke="#8B6914" strokeWidth="3" strokeLinecap="round" />
        <g transform="translate(0, 5)">
          <rect x="32" y="0" width="55" height="35" rx="1" fill="#FF0000" />
          <rect x="43" y="0" width="33" height="35" fill="#FFFFFF" />
          <g transform="translate(59.5, 17.5) scale(0.16)">
            <path d="M0,-60 L8,-20 L35,-35 L22,-5 L50,-12 L35,10 L58,15 L38,25 L60,45 L32,38 L38,65 L15,45 L0,70 L-15,45 L-38,65 L-32,38 L-60,45 L-38,25 L-58,15 L-35,10 L-50,-12 L-22,-5 L-35,-35 L-8,-20Z" fill="#FF0000" />
          </g>
        </g>
        <circle cx="30" cy="0" r="3" fill="#DAA520" />
      </g>

      {/* Ground / dirt mound */}
      <ellipse cx="200" cy="410" rx="195" ry="40" fill="#6D4C2A" />
      <ellipse cx="200" cy="405" rx="180" ry="30" fill="#8B6530" />

      {/* Beaver tail */}
      <ellipse cx="130" cy="370" rx="45" ry="18" fill="#6B4226" transform="rotate(-25 130 370)" />
      <g transform="translate(90, 340)">
        {/* Cross-hatch pattern on tail */}
        <line x1="15" y1="15" x2="55" y2="5" stroke="#5A3520" strokeWidth="1" opacity="0.4" />
        <line x1="10" y1="25" x2="60" y2="12" stroke="#5A3520" strokeWidth="1" opacity="0.4" />
        <line x1="12" y1="35" x2="55" y2="22" stroke="#5A3520" strokeWidth="1" opacity="0.4" />
        <line x1="25" y1="5" x2="30" y2="40" stroke="#5A3520" strokeWidth="1" opacity="0.4" />
        <line x1="40" y1="2" x2="42" y2="35" stroke="#5A3520" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Beaver body */}
      <ellipse cx="220" cy="340" rx="95" ry="80" fill="#A0714F" />
      <ellipse cx="220" cy="350" rx="70" ry="55" fill="#C49A6C" />

      {/* Strap / sash */}
      <line x1="170" y1="240" x2="260" y2="380" stroke="#6B4226" strokeWidth="8" strokeLinecap="round" />
      <line x1="170" y1="240" x2="260" y2="380" stroke="#8B6530" strokeWidth="5" strokeLinecap="round" />
      {/* Buckle */}
      <rect x="205" y="295" width="18" height="18" rx="2" fill="#DAA520" stroke="#B8860B" strokeWidth="1.5" />
      <rect x="211" y="300" width="6" height="8" rx="1" fill="#8B6530" />

      {/* Left arm */}
      <g transform="translate(145, 280)">
        <ellipse cx="0" cy="30" rx="18" ry="35" fill="#A0714F" transform="rotate(15)" />
        {/* Paw */}
        <circle cx="8" cy="62" r="10" fill="#8B6530" />
      </g>

      {/* Right arm */}
      <g transform="translate(285, 280)">
        <ellipse cx="0" cy="30" rx="18" ry="35" fill="#A0714F" transform="rotate(-15)" />
        <circle cx="-8" cy="62" r="10" fill="#8B6530" />
      </g>

      {/* Beaver head */}
      <ellipse cx="215" cy="230" rx="75" ry="68" fill="#A0714F" />

      {/* Cheeks */}
      <ellipse cx="175" cy="250" rx="30" ry="25" fill="#C49A6C" />
      <ellipse cx="255" cy="250" rx="30" ry="25" fill="#C49A6C" />

      {/* Inner face */}
      <ellipse cx="215" cy="245" rx="45" ry="35" fill="#C49A6C" />

      {/* Eyes */}
      <ellipse cx="195" cy="222" rx="10" ry="11" fill="#FFFFFF" />
      <ellipse cx="240" cy="222" rx="10" ry="11" fill="#FFFFFF" />
      <circle cx="198" cy="224" r="6" fill="#2C1810" />
      <circle cx="237" cy="224" r="6" fill="#2C1810" />
      <circle cx="200" cy="222" r="2" fill="#FFFFFF" />
      <circle cx="239" cy="222" r="2" fill="#FFFFFF" />

      {/* Nose */}
      <ellipse cx="217" cy="243" rx="10" ry="8" fill="#2C1810" />
      <ellipse cx="215" cy="241" rx="3" ry="2" fill="#5A3A2A" opacity="0.5" />

      {/* Mouth */}
      <path d="M207,253 Q217,262 227,253" fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" />

      {/* Teeth */}
      <rect x="209" y="253" width="7" height="12" rx="1.5" fill="#FFFFFF" stroke="#E0D5C5" strokeWidth="0.5" />
      <rect x="218" y="253" width="7" height="12" rx="1.5" fill="#FFFFFF" stroke="#E0D5C5" strokeWidth="0.5" />

      {/* Ears */}
      <circle cx="155" cy="195" r="12" fill="#A0714F" />
      <circle cx="155" cy="195" r="7" fill="#C49A6C" />
      <circle cx="275" cy="195" r="12" fill="#A0714F" />
      <circle cx="275" cy="195" r="7" fill="#C49A6C" />

      {/* Ranger hat */}
      <g transform="translate(215, 175)">
        {/* Hat brim */}
        <ellipse cx="0" cy="15" rx="80" ry="16" fill="#C8A951" />
        <ellipse cx="0" cy="12" rx="80" ry="14" fill="#DAC06A" />
        {/* Hat crown */}
        <path d="M-45,12 Q-50,-15 -30,-35 Q-10,-52 0,-55 Q10,-52 30,-35 Q50,-15 45,12Z" fill="#D4B85A" />
        <path d="M-45,12 Q-50,-15 -30,-35 Q-10,-52 0,-55 Q10,-52 30,-35 Q50,-15 45,12Z" fill="url(#hatGrad)" />
        {/* Hat band */}
        <rect x="-42" y="0" width="84" height="10" rx="1" fill="#8B6914" />
        {/* Hat dimples */}
        <path d="M-30,-10 Q0,-30 30,-10" fill="none" stroke="#C8A040" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Feet */}
      <ellipse cx="185" cy="400" rx="22" ry="10" fill="#8B6530" />
      <ellipse cx="260" cy="400" rx="22" ry="10" fill="#8B6530" />

      <defs>
        <linearGradient id="hatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8D080" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#B89930" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
