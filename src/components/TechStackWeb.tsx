import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Figma,
  Terminal,
  Code2,
  FileCode,
  Link2,
  Brain,
  Database,
  Cloud,
  Zap,
  Sparkles,
} from 'lucide-react';

type Category = 'ideation' | 'logic' | 'infra' | 'delivery';

interface Node {
  id: string;
  label: string;
  role: string;
  metric: string;
  Icon: React.ComponentType<{ className?: string }>;
  layer: 1 | 2 | 3 | 4;
  category: Category;
  /** angle in degrees, 0 = right, 90 = bottom */
  angle: number;
}

const LAYER_RADII = { 1: 110, 2: 190, 3: 270, 4: 350 };

const NODES: Node[] = [
  // Layer 1 — Ideation
  { id: 'figma', label: 'Figma', role: 'Design systems & product specs', metric: '0 → 1 in days, not weeks', Icon: Figma, layer: 1, category: 'ideation', angle: -120 },
  { id: 'cursor', label: 'Cursor', role: 'AI-assisted IDE & spec → code', metric: '3× faster prototypes', Icon: Terminal, layer: 1, category: 'ideation', angle: -60 },
  // Layer 2 — Logic
  { id: 'next', label: 'Next.js', role: 'App Router, RSC, edge-ready', metric: '<100ms TTI', Icon: Code2, layer: 2, category: 'logic', angle: -150 },
  { id: 'ts', label: 'TypeScript', role: 'End-to-end type safety', metric: '40% fewer runtime bugs', Icon: FileCode, layer: 2, category: 'logic', angle: -30 },
  { id: 'langchain', label: 'LangChain', role: 'Prompt chains & agent memory', metric: 'Composable AI flows', Icon: Link2, layer: 2, category: 'logic', angle: 90 },
  // Layer 3 — Infrastructure
  { id: 'claude', label: 'Claude API', role: 'LLM reasoning & generation core', metric: '~800ms p50 inference', Icon: Brain, layer: 3, category: 'infra', angle: -90 },
  { id: 'supabase', label: 'Supabase + pgvector', role: 'Realtime DB, auth, vector search', metric: 'Sub-50ms semantic queries', Icon: Database, layer: 3, category: 'infra', angle: 30 },
  // Layer 4 — Delivery
  { id: 'vercel', label: 'Vercel', role: 'Global edge deployment', metric: '99.99% uptime', Icon: Cloud, layer: 4, category: 'delivery', angle: 150 },
  { id: 'edge', label: 'Edge Functions', role: 'Streaming AI at the edge', metric: '<50ms cold start', Icon: Zap, layer: 4, category: 'delivery', angle: 60 },
];

const CATEGORY_COLOR: Record<Category, string> = {
  ideation: '#a855f7', // cyber purple
  logic: '#3b82f6', // electric blue
  infra: '#a855f7',
  delivery: '#3b82f6',
};

const HOVER_COLOR = '#f59e0b'; // warm amber

const SIZE = 760; // svg viewBox size
const CENTER = SIZE / 2;

const polar = (angleDeg: number, r: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CENTER + Math.cos(a) * r, y: CENTER + Math.sin(a) * r };
};

const TechStackWeb = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    NODES.forEach((n) => {
      map[n.id] = polar(n.angle, LAYER_RADII[n.layer]);
    });
    return map;
  }, []);

  const hoveredNode = hovered ? NODES.find((n) => n.id === hovered) : null;

  return (
    <div className="relative w-full">
      {/* Dark surface with dot-matrix blueprint */}
      <div
        className="relative rounded-3xl overflow-hidden border border-white/5"
        style={{
          background:
            'radial-gradient(ellipse at center, #0b1226 0%, #020617 70%)',
        }}
      >
        {/* Dot matrix background */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(148,163,184,0.18) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 40%, rgba(2,6,23,0.85) 100%)',
          }}
        />

        <div className="relative aspect-square w-full max-w-[760px] mx-auto">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Concentric layer rings */}
            {[1, 2, 3, 4].map((l) => (
              <circle
                key={l}
                cx={CENTER}
                cy={CENTER}
                r={LAYER_RADII[l as 1 | 2 | 3 | 4]}
                fill="none"
                stroke="rgba(148,163,184,0.15)"
                strokeWidth={1}
                strokeDasharray="2 6"
              />
            ))}

            {/* Connecting paths from center to each node */}
            {NODES.map((n) => {
              const p = positions[n.id];
              const isHovered = hovered === n.id;
              const isDimmed = hovered && !isHovered;
              const stroke = isHovered ? HOVER_COLOR : CATEGORY_COLOR[n.category];
              return (
                <motion.line
                  key={`line-${n.id}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={p.x}
                  y2={p.y}
                  stroke={stroke}
                  strokeWidth={isHovered ? 1.6 : 0.8}
                  strokeLinecap="round"
                  filter="url(#soft-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isDimmed ? 0.15 : isHovered ? 1 : 0.55,
                  }}
                  transition={{
                    pathLength: { duration: 1.2, delay: 0.2 + n.layer * 0.15, ease: 'easeOut' },
                    opacity: { duration: 0.3 },
                  }}
                />
              );
            })}

            {/* Heartbeat pulse rings emanating from Claude (center-ish) */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={`pulse-${i}`}
                cx={CENTER}
                cy={CENTER}
                r={40}
                fill="none"
                stroke="#a855f7"
                strokeWidth={1}
                filter="url(#soft-glow)"
                initial={{ scale: 0.4, opacity: 0.6 }}
                animate={{ scale: 6, opacity: 0 }}
                style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                transition={{
                  duration: 4,
                  delay: i * 1.3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Center core */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={70}
              fill="url(#core-grad)"
              filter="url(#strong-glow)"
            />
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={26}
              fill="#020617"
              stroke="#a855f7"
              strokeWidth={1.5}
              filter="url(#soft-glow)"
              animate={{ r: [26, 30, 26] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <foreignObject x={CENTER - 90} y={CENTER - 18} width={180} height={36}>
              <div className="text-center text-[11px] font-mono tracking-wider text-white/90">
                <div className="flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-purple-300" />
                  <span>CORE</span>
                </div>
                <div className="text-[9px] text-white/60">AI-Native Product UX</div>
              </div>
            </foreignObject>

            {/* Nodes */}
            {NODES.map((n, idx) => {
              const p = positions[n.id];
              const isHovered = hovered === n.id;
              const isDimmed = hovered && !isHovered;
              const Icon = n.Icon;
              const color = isHovered ? HOVER_COLOR : CATEGORY_COLOR[n.category];
              return (
                <motion.g
                  key={n.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: isDimmed ? 0.3 : 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + idx * 0.06,
                    ease: 'easeOut',
                  }}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.g
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 4 + (idx % 3),
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.2,
                    }}
                  >
                    {/* Outer ring */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 30 : 26}
                      fill="rgba(2,6,23,0.85)"
                      stroke={color}
                      strokeWidth={isHovered ? 1.8 : 1}
                      filter="url(#soft-glow)"
                    />
                    {/* Icon */}
                    <foreignObject
                      x={p.x - 12}
                      y={p.y - 12}
                      width={24}
                      height={24}
                    >
                      <div
                        className="w-6 h-6 flex items-center justify-center"
                        style={{ color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </foreignObject>
                    {/* Label */}
                    <foreignObject
                      x={p.x - 70}
                      y={p.y + 30}
                      width={140}
                      height={20}
                    >
                      <div
                        className="text-center text-[10px] font-mono tracking-wide whitespace-nowrap"
                        style={{ color: isHovered ? HOVER_COLOR : 'rgba(226,232,240,0.85)' }}
                      >
                        {n.label}
                      </div>
                    </foreignObject>
                  </motion.g>
                </motion.g>
              );
            })}
          </svg>

          {/* Glassmorphism info card */}
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[min(92%,360px)]"
            >
              <div
                className="rounded-xl border border-white/10 p-4 shadow-2xl"
                style={{
                  background: 'rgba(15,23,42,0.7)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: HOVER_COLOR, boxShadow: `0 0 8px ${HOVER_COLOR}` }}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Layer {hoveredNode.layer} · {hoveredNode.category}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">{hoveredNode.label}</h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  {hoveredNode.role}
                </p>
                <div className="mt-2 text-[11px] font-mono text-amber-300/90">
                  → {hoveredNode.metric}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <div className="relative px-6 pb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-mono text-white/60">
          {[
            { l: 'L1 · Ideation', c: '#a855f7' },
            { l: 'L2 · Logic', c: '#3b82f6' },
            { l: 'L3 · Infrastructure', c: '#a855f7' },
            { l: 'L4 · Delivery', c: '#3b82f6' },
          ].map((x) => (
            <div key={x.l} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: x.c, boxShadow: `0 0 6px ${x.c}` }} />
              <span>{x.l}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Hover any node to focus the path and reveal its role.
      </p>
    </div>
  );
};

export default TechStackWeb;