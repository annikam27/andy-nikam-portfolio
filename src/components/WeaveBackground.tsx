// Architectural "Blueprint" weave — ultra-fine monochromatic Slate lines
// on a clean white/slate base. Depth comes from line density at crossings,
// not color. Hover any of the 4 quadrants (via the `data-focus-quadrant`
// attribute on a parent) to selectively illuminate that quadrant in cyan.

import { useEffect, useState } from 'react';

const INK = '#1e293b';   // Midnight Slate — the only weave color by default
const POP = '#22d3ee';   // Cyan — selective focus accent

type Quadrant = 'tl' | 'tr' | 'bl' | 'br' | null;

export const WeaveBackground = () => {
  const [focus, setFocus] = useState<Quadrant>(null);

  // Listen for quadrant focus events emitted by metric cards (or anything else)
  useEffect(() => {
    const onFocus = (e: Event) => {
      const detail = (e as CustomEvent).detail as { quadrant: Quadrant };
      setFocus(detail?.quadrant ?? null);
    };
    window.addEventListener('weave:focus', onFocus as EventListener);
    return () => window.removeEventListener('weave:focus', onFocus as EventListener);
  }, []);

  const W = 1600;
  const H = 1000;

  // Build a dense, woven matrix: two diagonal families that cross each other.
  // Family A: cascading top-right → bottom-left wavy threads (primary flow).
  // Family B: counter-diagonal threads that weave through Family A.
  type Thread = { d: string; quadrant: Quadrant };
  const threads: Thread[] = [];

  const quadrantOf = (x: number, y: number): Quadrant => {
    const left = x < W / 2;
    const top = y < H / 2;
    if (top && left) return 'tl';
    if (top && !left) return 'tr';
    if (!top && left) return 'bl';
    return 'br';
  };

  // Family A — 56 threads, top-right → bottom-left diagonal cascade
  const countA = 56;
  for (let i = 0; i < countA; i++) {
    const t = i / (countA - 1);
    const yStart = -160 + t * (H + 320);
    const yEnd = yStart - 260 + Math.sin(i * 0.7) * 70;
    const amp = 70 + Math.sin(i * 1.3) * 35;
    const phase = i * 0.55;

    const d = `
      M ${W + 80},${yStart}
      C ${W * 0.78},${yStart + amp * Math.sin(phase)} ${W * 0.62},${yStart - amp * Math.cos(phase)} ${W * 0.5},${(yStart + yEnd) / 2}
      S ${W * 0.28},${(yStart + yEnd) / 2 - amp * Math.sin(phase + 1)} ${W * 0.12},${yEnd + amp * 0.4}
      S -${80},${yEnd + amp * 0.8} -${160},${yEnd + 120}
    `;
    threads.push({ d, quadrant: quadrantOf(W * 0.5, (yStart + yEnd) / 2) });
  }

  // Family B — 36 counter-diagonal threads (top-left → bottom-right) for the weave
  const countB = 36;
  for (let i = 0; i < countB; i++) {
    const t = i / (countB - 1);
    const yStart = -120 + t * (H + 240);
    const yEnd = yStart + 220 + Math.cos(i * 0.6) * 55;
    const amp = 55 + Math.cos(i * 1.1) * 25;
    const phase = i * 0.42;

    const d = `
      M -${80},${yStart}
      C ${W * 0.22},${yStart + amp * Math.cos(phase)} ${W * 0.4},${yStart - amp * Math.sin(phase)} ${W * 0.5},${(yStart + yEnd) / 2}
      S ${W * 0.74},${(yStart + yEnd) / 2 + amp * Math.cos(phase + 1)} ${W * 0.9},${yEnd - amp * 0.3}
      S ${W + 80},${yEnd + amp * 0.6} ${W + 160},${yEnd + 100}
    `;
    threads.push({ d, quadrant: quadrantOf(W * 0.5, (yStart + yEnd) / 2) });
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clean blueprint base — soft white → slate, mirrors original portfolio */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #ffffff 0%, #f8fafc 45%, #eef2f7 100%)',
        }}
      />

      {/* The fine-line weave */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        // shape-rendering keeps the 0.5px lines crisp on all DPRs
        shapeRendering="geometricPrecision"
      >
        <defs>
          {/* Subtle vignette mask so edges don't feel hard */}
          <radialGradient id="weave-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="80%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* Base ink layer — every thread, very low opacity. Density at crossings
            naturally produces darker areas (depth via luminance). */}
        <g
          stroke={INK}
          strokeWidth={0.5}
          strokeOpacity={focus ? 0.12 : 0.28}
          fill="none"
          strokeLinecap="round"
          style={{ transition: 'stroke-opacity 300ms ease' }}
        >
          {threads.map((t, i) => (
            <path key={`ink-${i}`} d={t.d} />
          ))}
        </g>

        {/* Selective focus layer — only threads in the hovered quadrant pop in cyan */}
        {focus && (
          <g
            stroke={POP}
            strokeWidth={0.6}
            strokeOpacity={0.95}
            fill="none"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 1.5px rgba(34,211,238,0.55))' }}
          >
            {threads
              .filter((t) => t.quadrant === focus)
              .map((t, i) => (
                <path key={`pop-${i}`} d={t.d} />
              ))}
          </g>
        )}
      </svg>
    </div>
  );
};

// Helper: emit a focus event from anywhere in the tree
export const focusWeaveQuadrant = (quadrant: 'tl' | 'tr' | 'bl' | 'br' | null) => {
  window.dispatchEvent(new CustomEvent('weave:focus', { detail: { quadrant } }));
};
