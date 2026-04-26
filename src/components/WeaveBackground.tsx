// Static, multi-zone NEON "weave" background.
// Three non-touching zones: A (top-right, ultraviolet input cascade),
// B (top-left, lime+cyan catalyst spark), C (bottom, full-width cyan+lime scaling flow).
// No animation. All paths sit behind copy with low opacity + screen blend so text stays crisp.

const NEON = {
  cyan: '#00f2ff',        // electric cyan
  teal: '#22d3ee',        // teal accent
  violet: '#7c3aed',      // ultra violet
  deepBlue: '#1e3a8a',    // deep blue (zone A shadow)
  amethyst: '#a855f7',    // cyber purple
  lime: '#a3ff12',        // fluorescent lime
  emerald: '#10b981',     // emerald (zone C depth)
  sunset: '#f59e0b',      // warm sunset orange (productivity accent dots)
};

type Path = { d: string; stroke: string; sw: number; op: number };

// Generates a dense weaving cluster centered roughly at (cx, cy) with given radius.
// Direction: 'diag' (TR→BL), 'spark' (tight radial), 'flow' (left→right wide).
function buildCluster(
  seedOffset: number,
  count: number,
  cx: number,
  cy: number,
  spread: number,
  amp: number,
  palette: string[],
  direction: 'diag' | 'spark' | 'flow',
): Path[] {
  const paths: Path[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1 || 1);
    const phase = (i + seedOffset) * 0.55;
    const a = amp + Math.sin(phase) * (amp * 0.4);
    const stroke = palette[i % palette.length];
    const sw = 0.8 + (i % 3) * 0.4;
    const op = 0.35 + (i % 4) * 0.08;

    let d = '';
    if (direction === 'diag') {
      // Top-right cluster, weaving down-left
      const x0 = cx + spread * 0.9;
      const y0 = cy - spread * 0.6 + t * spread * 1.2;
      const x1 = cx - spread * 0.9;
      const y1 = cy + spread * 0.4 + t * spread * 0.6;
      d = `
        M ${x0},${y0}
        C ${cx + spread * 0.4},${y0 + a * Math.sin(phase)}
          ${cx + spread * 0.1},${(y0 + y1) / 2 - a * Math.cos(phase)}
          ${cx},${(y0 + y1) / 2}
        S ${cx - spread * 0.5},${(y0 + y1) / 2 + a * Math.sin(phase + 1)}
          ${x1},${y1}
      `;
    } else if (direction === 'spark') {
      // Tight intersecting strokes around (cx,cy)
      const angle = (i / count) * Math.PI * 2 + seedOffset * 0.1;
      const r = spread * (0.5 + 0.5 * Math.sin(phase));
      const x0 = cx + Math.cos(angle) * spread;
      const y0 = cy + Math.sin(angle) * spread * 0.7;
      const x1 = cx - Math.cos(angle) * spread;
      const y1 = cy - Math.sin(angle) * spread * 0.7;
      d = `
        M ${x0},${y0}
        C ${cx + Math.cos(angle + 1) * r},${cy + Math.sin(angle + 1) * r * 0.7}
          ${cx - Math.cos(angle + 1) * r},${cy - Math.sin(angle + 1) * r * 0.7}
          ${x1},${y1}
      `;
    } else {
      // Bottom flow — left→right, full width, increasingly dense to the right
      const yBase = cy + (t - 0.5) * spread;
      const x0 = cx - spread * 1.6;
      const x1 = cx + spread * 1.6;
      d = `
        M ${x0},${yBase + a * Math.sin(phase)}
        C ${cx - spread * 0.6},${yBase + a * Math.sin(phase + 0.6)}
          ${cx - spread * 0.2},${yBase - a * Math.cos(phase)}
          ${cx},${yBase + a * 0.2 * Math.sin(phase + 1)}
        S ${cx + spread * 0.5},${yBase + a * Math.cos(phase + 0.5)}
          ${x1},${yBase + a * 0.6 * Math.sin(phase + 1.5)}
      `;
    }

    paths.push({ d, stroke, sw, op });
  }
  return paths;
}

export const WeaveBackground = () => {
  const W = 1600;
  const H = 1000;

  // Zone A — Top-Right "Input Cascade" (Ultra Violet + Deep Blue)
  const zoneA = buildCluster(
    1,
    26,
    W * 0.82,
    H * 0.18,
    220,
    70,
    [NEON.violet, NEON.deepBlue, NEON.amethyst, NEON.violet, NEON.deepBlue],
    'diag',
  );

  // Zone B — Top-Left "Catalyst Spark" (Lime + Cyan)
  const zoneB = buildCluster(
    7,
    14,
    W * 0.18,
    H * 0.22,
    110,
    40,
    [NEON.lime, NEON.cyan, NEON.lime, NEON.teal],
    'spark',
  );

  // Zone C — Bottom "Scaling Impact" (Cyan + Lime + Emerald), full width
  const zoneC = buildCluster(
    3,
    34,
    W * 0.5,
    H * 0.82,
    260,
    90,
    [NEON.cyan, NEON.lime, NEON.teal, NEON.emerald, NEON.cyan, NEON.lime],
    'flow',
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft base wash so neon reads on the light background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 85% 18%, rgba(124,58,237,0.06), transparent 60%),' +
            'radial-gradient(40% 35% at 18% 22%, rgba(163,255,18,0.05), transparent 60%),' +
            'radial-gradient(80% 45% at 50% 88%, rgba(0,242,255,0.07), transparent 65%)',
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="neon-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="clarity-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={NEON.cyan} stopOpacity="0.18" />
            <stop offset="55%" stopColor={NEON.cyan} stopOpacity="0.06" />
            <stop offset="100%" stopColor={NEON.cyan} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Zone A — Top-Right ultraviolet cascade */}
        <g style={{ mixBlendMode: 'multiply', opacity: 0.75 }} filter="url(#neon-glow)">
          {zoneA.map((p, i) => (
            <path
              key={`a-${i}`}
              d={p.d}
              stroke={p.stroke}
              strokeWidth={p.sw + 0.6}
              strokeOpacity={Math.min(0.9, p.op + 0.35)}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Zone B — Top-Left catalyst spark */}
        <g style={{ mixBlendMode: 'multiply', opacity: 0.8 }} filter="url(#neon-glow)">
          {zoneB.map((p, i) => (
            <path
              key={`b-${i}`}
              d={p.d}
              stroke={p.stroke}
              strokeWidth={p.sw + 0.8}
              strokeOpacity={Math.min(0.95, p.op + 0.4)}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Zone C — Bottom full-width scaling flow */}
        <g style={{ mixBlendMode: 'multiply', opacity: 0.85 }} filter="url(#neon-soft)">
          {zoneC.map((p, i) => {
            // Density gradient: right side gets stronger opacity & weight
            const tail = i / zoneC.length;
            return (
              <path
                key={`c-${i}`}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.sw + 0.6 + tail * 0.8}
                strokeOpacity={Math.min(0.95, p.op + 0.3 + tail * 0.25)}
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Subtle warm sunset accent dots in Zone C (Productivity hue) */}
        <g style={{ mixBlendMode: 'screen', opacity: 0.55 }}>
          {[0.15, 0.35, 0.62, 0.84].map((x, i) => (
            <circle
              key={`d-${i}`}
              cx={W * x}
              cy={H * (0.78 + (i % 2) * 0.05)}
              r={1.6}
              fill={NEON.sunset}
            />
          ))}
        </g>

        {/* "Clarity" radial glow — sits behind the headline center */}
        <ellipse
          cx={W * 0.58}
          cy={H * 0.46}
          rx={300}
          ry={180}
          fill="url(#clarity-glow)"
          style={{ mixBlendMode: 'screen' }}
        />
      </svg>

      {/* Legibility cutout — soft white halo ONLY behind the headline copy.
          Kept tight so the three neon zones stay vivid. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(22% 14% at 50% 46%, rgba(255,255,255,0.75), rgba(255,255,255,0) 75%)',
        }}
      />
    </div>
  );
};
