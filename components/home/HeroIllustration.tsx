/** Flat editorial illustration of an organized pantry (Phase 2 palette, inline SVG — no network request). */
function Jar({
  x,
  y,
  w,
  h,
  cap,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  cap: string;
  label: string;
}) {
  const capH = Math.max(10, Math.round(w * 0.32));
  const labelW = Math.min(30, w - 12);
  const labelH = Math.round(h * 0.3);
  return (
    <g>
      <rect x={x} y={y - capH} width={w} height={capH} rx={Math.round(capH / 2)} fill={cap} />
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#f3f7f2" stroke="#b9c9b7" />
      <rect
        x={x + (w - labelW) / 2}
        y={y + Math.round(h * 0.42)}
        width={labelW}
        height={labelH}
        rx={4}
        fill={label}
      />
    </g>
  );
}

function Sparkle({ x, y, s = 7 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M ${x} ${y - s} L ${x + s * 0.32} ${y - s * 0.32} L ${x + s} ${y} L ${x + s * 0.32} ${y + s * 0.32} L ${x} ${y + s} L ${x - s * 0.32} ${y + s * 0.32} L ${x - s} ${y} L ${x - s * 0.32} ${y - s * 0.32} Z`}
      fill="#2e7d4f"
    />
  );
}

export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 440"
      role="img"
      aria-label="Illustration of an organized pantry with glass jars, a milk carton, and freezer storage"
      className="h-auto w-full"
    >
      <rect width="520" height="440" rx="32" fill="#e3f1e8" />
      <circle cx="44" cy="36" r="150" fill="#ffffff" opacity="0.4" />
      <circle cx="498" cy="420" r="120" fill="#ffffff" opacity="0.35" />

      {/* Cabinet */}
      <ellipse cx="260" cy="404" rx="205" ry="16" fill="#d5e6d9" opacity="0.7" />
      <rect x="100" y="70" width="320" height="330" rx="22" fill="#ffffff" stroke="#2e7d4f" strokeWidth="5" />
      <rect x="100" y="58" width="320" height="12" rx="6" fill="#1b5e3b" />
      <rect x="100" y="392" width="320" height="10" rx="5" fill="#1b5e3b" />
      <rect x="112" y="184" width="296" height="6" rx="3" fill="#2e7d4f" />
      <rect x="112" y="294" width="296" height="6" rx="3" fill="#2e7d4f" />

      {/* Top shelf — jars */}
      <Jar x={136} y={118} w={52} h={66} cap="#2e7d4f" label="#fbf0e2" />
      <Jar x={218} y={92} w={60} h={92} cap="#1b5e3b" label="#e3f1e8" />
      <Jar x={320} y={120} w={48} h={64} cap="#b5712f" label="#fbf0e2" />

      {/* Middle shelf — milk carton, amber canister, jar */}
      <path d="M136 228 L160 214 L184 228 Z" fill="#1b5e3b" />
      <rect x="136" y="228" width="48" height="66" rx="8" fill="#ffffff" stroke="#b9c9b7" />
      <rect x="136" y="254" width="48" height="14" fill="#e3f1e8" />
      <rect x="244" y="224" width="44" height="12" rx="6" fill="#b5712f" />
      <circle cx="266" cy="262" r="34" fill="#fbf0e2" stroke="#b5712f" strokeWidth="4" />
      <circle cx="266" cy="262" r="16" fill="#b5712f" opacity="0.35" />
      <Jar x={316} y={232} w={52} h={62} cap="#3e945f" label="#e3f1e8" />

      {/* Bottom shelf — produce bowl, bottle, small jar */}
      <rect x="136" y="316" width="124" height="70" rx="18" fill="#e3f1e8" stroke="#3e945f" strokeWidth="4" />
      <circle cx="198" cy="334" r="17" fill="#3e945f" />
      <path d="M198 317 q7 -9 13 -7 q-1 9 -13 7 Z" fill="#1b5e3b" />
      <rect x="296" y="308" width="44" height="12" rx="6" fill="#b5712f" />
      <rect x="296" y="318" width="44" height="68" rx="10" fill="#ffffff" stroke="#b9c9b7" />
      <rect x="296" y="344" width="44" height="10" fill="#fbf0e2" />
      <Jar x={356} y={330} w={44} h={56} cap="#2e7d4f" label="#fbf0e2" />

      {/* Floating badges — freezer, clock, leaf, snowflake */}
      <g>
        <circle cx="74" cy="118" r="28" fill="#ffffff" stroke="#2e7d4f" strokeWidth="4" />
        <g stroke="#1b5e3b" strokeWidth="3.5" strokeLinecap="round">
          <line x1="74" y1="96" x2="74" y2="140" />
          <line x1="54" y1="118" x2="94" y2="118" />
          <line x1="60" y1="104" x2="88" y2="132" />
          <line x1="88" y1="104" x2="60" y2="132" />
        </g>
      </g>
      <g>
        <circle cx="446" cy="84" r="26" fill="#ffffff" stroke="#3e945f" strokeWidth="4" />
        <circle cx="446" cy="84" r="11" fill="none" stroke="#1b5e3b" strokeWidth="3" />
        <line x1="446" y1="84" x2="446" y2="76" stroke="#1b5e3b" strokeWidth="3" strokeLinecap="round" />
        <line x1="446" y1="84" x2="452" y2="88" stroke="#1b5e3b" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g>
        <circle cx="78" cy="330" r="22" fill="#fbf0e2" stroke="#b5712f" strokeWidth="4" />
        <path
          d="M78 316 q7 12 0 18 q-7 -6 0 -18 Z"
          fill="#3e945f"
        />
        <path d="M78 318 q2 -4 5 -3 q-1 5 -5 3 Z" fill="#1b5e3b" />
      </g>
      <g>
        <circle cx="452" cy="306" r="24" fill="#ffffff" stroke="#b5712f" strokeWidth="4" />
        <g stroke="#1b5e3b" strokeWidth="3" strokeLinecap="round">
          <line x1="452" y1="286" x2="452" y2="326" />
          <line x1="438" y1="306" x2="466" y2="306" />
          <line x1="442" y1="296" x2="462" y2="316" />
          <line x1="462" y1="296" x2="442" y2="316" />
        </g>
      </g>

      {/* Decorative sparkles */}
      <Sparkle x={52} y={210} s={7} />
      <Sparkle x={470} y={160} s={8} />
      <Sparkle x={150} y={60} s={6} />
      <Sparkle x={420} y={380} s={6} />
    </svg>
  );
}
