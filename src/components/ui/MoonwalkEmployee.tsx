interface MoonwalkEmployeeProps {
  /** Loading progress 0-100; drives both the position along the bar and the walk cycle */
  progress: number;
}

const STEPS = 8; // full leg cycles from 0 to 100%
const SKIN = '#f2c9a0';
const SUIT = '#16181d';
const SUIT_DARK = '#0e0f12';
const HAT = '#1a1c21';
const TROUSERS = '#1b1d23';
const TIE = '#050607';
const CASE = '#0b0c0e';

/**
 * One leg, seen from the side. The flat foot is dragged backwards along the floor while the
 * other foot rises onto its toes and glides forward: the classic moonwalk shuffle.
 */
function Leg({ phase, back }: { phase: number; back?: boolean }) {
  const slide = Math.cos(phase) * 9;
  const toes = Math.max(0, Math.sin(phase)); // 0 = flat on the floor, 1 = up on the toes
  const color = back ? '#101216' : TROUSERS;
  return (
    <g transform={`translate(${slide} ${-toes * 1.5})`}>
      <rect x="26" y="42" width="9" height="36" rx="4" fill={color} />
      {/* white sock, then the shoe pivots about the toe so the heel lifts */}
      <rect x="26" y="74" width="9" height="5" fill="#d0d3da" />
      <g transform={`rotate(${-toes * 52} 18.5 84)`}>
        <path d="M18.5 80.5 q0 -2.5 3 -2.5 h10.5 a3 3 0 0 1 3 3 v3 h-16.5 z" fill={back ? '#20283d' : '#0f1420'} />
        <rect x="18.5" y="83" width="16.5" height="1.6" rx="0.8" fill="#4a4d57" />
      </g>
    </g>
  );
}

/**
 * Cartoon office worker with a briefcase and a fedora, facing left while gliding right along
 * the loading bar: a moonwalk. Everything is derived from `progress`, so the two splash
 * halves always render identical frames.
 */
export function MoonwalkEmployee({ progress }: MoonwalkEmployeeProps) {
  const phase = (progress / 100) * STEPS * Math.PI * 2;
  const bob = Math.abs(Math.sin(phase)) * 1.2;
  const swing = Math.sin(phase) * 8;

  return (
    <div
      className="pointer-events-none absolute bottom-[3px] z-20 h-[112px] w-[80px] -translate-x-1/2"
      style={{ left: `${progress}%` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 90" className="h-full w-full overflow-visible">
        {/* floor shadow */}
        <ellipse cx="30" cy="85" rx="20" ry="2.6" fill="rgba(0,0,0,0.4)" />

        <g transform={`translate(0 ${-bob})`}>
          {/* far leg first, then the near leg in front of it */}
          <Leg phase={phase + Math.PI} back />
          <Leg phase={phase} />

          {/* torso leans back a little */}
          <g transform="translate(0 -8) rotate(-6 32 56)">
            <rect x="21" y="27" width="22" height="29" rx="7" fill={SUIT} />
            <path d="M32 28 l5 0 l-5 12 l-5 -12 z" fill="#1f2128" />
            <path d="M32 32 l-2 2 l2 10 l2 -10 z" fill={TIE} />
            <rect x="21" y="50" width="22" height="3" fill={SUIT_DARK} opacity="0.55" />

            {/* head */}
            <rect x="29" y="23" width="6" height="5" rx="2" fill={SKIN} />
            <circle cx="32" cy="15" r="9.5" fill={SKIN} />
            <path d="M22.5 14 a9.6 9.6 0 0 1 19 0 c-3 -3.6 -8 -4.4 -11.5 -2.8 c-3 1.2 -5.4 1.6 -7.5 2.8 z" fill="#2b2118" />
            <circle cx="27.5" cy="15.5" r="1.5" fill="#1a1a1a" />
            <circle cx="27" cy="15" r="0.5" fill="#fff" />
            <path d="M24.2 20 q3 2.6 6 0" stroke="#8a4b3a" strokeWidth="1.1" fill="none" strokeLinecap="round" />
            <circle cx="39" cy="17" r="2" fill="#e9b88c" />
            <circle cx="27.5" cy="15.5" r="3.2" fill="none" stroke="#111827" strokeWidth="0.9" />
            <path d="M30.7 15.2 L36 14.4" stroke="#111827" strokeWidth="0.9" />
            {/* fedora, tipped forward */}
            <g transform="rotate(-8 32 8)">
              <ellipse cx="31" cy="8" rx="14" ry="2.8" fill={HAT} stroke="#3a3d46" strokeWidth="0.6" />
              <rect x="23" y="-1" width="17" height="9" rx="3.5" fill={HAT} stroke="#3a3d46" strokeWidth="0.6" />
              <rect x="23" y="4.2" width="17" height="2.2" fill={TIE} />
            </g>

            {/* arm holding the briefcase, swinging with the walk */}
            <g transform={`rotate(${swing} 25 33)`}>
              <rect x="21" y="31" width="7" height="20" rx="3.5" fill={SUIT_DARK} />
              <circle cx="24.5" cy="52" r="3.4" fill={SKIN} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
