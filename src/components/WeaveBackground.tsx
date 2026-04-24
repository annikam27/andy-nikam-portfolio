// Static, multilayered "weave" SVG background — cool brand palette only.
// No animations. Low opacity so foreground copy stays legible.

const HUES = {
  sky: '#38bdf8',       // sky blue
  teal: '#14b8a6',      // cyber teal/green accent
  sapphire: '#1e40af',  // deep sapphire
  indigo: '#6366f1',    // cool amethyst/indigo for shadow depth
  cyan: '#22d3ee',      // bright cyan highlight
};

export const WeaveBackground = () => {
  // Generate a dense set of overlapping wavy paths cascading
  // from top-right to bottom-left.
  const paths: { d: string; stroke: string; sw: number; op: number; blend: string }[] = [];
  const W = 1600;
  const H = 1000;
  const count = 38;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    // Diagonal offset: each line shifts down-left
    const yStart = -120 + t * (H + 240);
    const yEnd = yStart - 220 + Math.sin(i * 0.7) * 60;
    const amp = 90 + Math.sin(i * 1.3) * 40;
    const phase = i * 0.55;

    // Cubic-ish wavy path with multiple control points (weaving look)
    const d = `
      M ${W + 80},${yStart}
      C ${W * 0.78},${yStart + amp * Math.sin(phase)} ${W * 0.62},${yStart - amp * Math.cos(phase)} ${W * 0.5},${(yStart + yEnd) / 2}
      S ${W * 0.28},${(yStart + yEnd) / 2 - amp * Math.sin(phase + 1)} ${W * 0.12},${yEnd + amp * 0.4}
      S -${80},${yEnd + amp * 0.8} -${160},${yEnd + 120}
    `;

    // Distribute hues — teal & cyan as bright accents, indigo/sapphire as shadow
    const palette = [HUES.sky, HUES.teal, HUES.sapphire, HUES.cyan, HUES.indigo, HUES.sky, HUES.teal];
    const stroke = palette[i % palette.length];
    const isAccent = stroke === HUES.teal || stroke === HUES.cyan;
    const isShadow = stroke === HUES.indigo || stroke === HUES.sapphire;

    paths.push({
      d,
      stroke,
      sw: isAccent ? 1 : isShadow ? 1.6 : 1.2,
      op: isAccent ? 0.55 : isShadow ? 0.4 : 0.45,
      blend: isShadow ? 'multiply' : 'screen',
    });
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft base wash so the weave reads on light AND dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 85% 10%, rgba(20,184,166,0.08), transparent 55%), radial-gradient(100% 80% at 15% 90%, rgba(99,102,241,0.07), transparent 55%)',
        }}
      />

      {/* The weave — capped to 18-22% opacity overall */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.22 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="weave-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
          <radialGradient id="clarity-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={HUES.cyan} stopOpacity="0.55" />
            <stop offset="60%" stopColor={HUES.sky} stopOpacity="0.12" />
            <stop offset="100%" stopColor={HUES.sky} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shadow layer (multiply) */}
        <g style={{ mixBlendMode: 'multiply' }}>
          {paths
            .filter((p) => p.blend === 'multiply')
            .map((p, i) => (
              <path
                key={`m-${i}`}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.sw}
                strokeOpacity={p.op}
                fill="none"
                strokeLinecap="round"
                filter="url(#weave-soft)"
              />
            ))}
        </g>

        {/* Light layer (screen) */}
        <g style={{ mixBlendMode: 'screen' }}>
          {paths
            .filter((p) => p.blend === 'screen')
            .map((p, i) => (
              <path
                key={`s-${i}`}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.sw}
                strokeOpacity={p.op}
                fill="none"
                strokeLinecap="round"
              />
            ))}
        </g>
      </svg>

      {/* Focused "Clarity" glow — sits behind headline center */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <ellipse
          cx={W * 0.58}
          cy={H * 0.46}
          rx={260}
          ry={170}
          fill="url(#clarity-glow)"
          style={{ mixBlendMode: 'screen' }}
        />
      </svg>
    </div>
  );
};
