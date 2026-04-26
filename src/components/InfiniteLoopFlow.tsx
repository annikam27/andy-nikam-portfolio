import { useState, useMemo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shuffle,
  Search,
  ClipboardList,
  Wrench,
  BarChart3,
  Sparkles,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// ---------- Data: 7 AI Lifecycle Stages ----------
type Stage = {
  id: string;
  num: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string; // node semantic color
  pathColor: string; // outgoing connection color (to next node)
};

const CYAN = '#06bcd4';
const BLUE = '#4f9bff';
const PURPLE = '#a855f7';
const GREEN = '#10b981';

const STAGES: Stage[] = [
  {
    id: 's1',
    num: '01',
    title: 'Problem Identification And Requirement Analysis',
    description:
      'Frame the user problem, success metrics, and constraints. Translate business goals into AI-ready requirements.',
    metricLabel: 'Hypotheses Validated',
    metricValue: '94%',
    icon: Shuffle,
    color: CYAN,
    pathColor: CYAN, // Discovery → Data
  },
  {
    id: 's2',
    num: '02',
    title: 'Data Collection and Preparation',
    description:
      'Source, label, and engineer features. Build pipelines that keep training and inference data in lockstep.',
    metricLabel: 'Pipeline Uptime',
    metricValue: '99.8%',
    icon: Search,
    color: CYAN,
    pathColor: PURPLE, // Data → Build
  },
  {
    id: 's3',
    num: '03',
    title: 'Model Selection and Training',
    description:
      'Pick the right architecture per task — fine-tune, RAG, or agentic — and run reproducible training loops.',
    metricLabel: 'Train → Eval Cycle',
    metricValue: '< 6 hrs',
    icon: ClipboardList,
    color: PURPLE,
    pathColor: PURPLE,
  },
  {
    id: 's4',
    num: '04',
    title: 'Model Development',
    description:
      'Wrap the model in product surfaces, tools, and guardrails. The apex of the loop where ideas become shipped behavior.',
    metricLabel: 'Build Velocity',
    metricValue: '+38%',
    icon: Wrench,
    color: PURPLE,
    pathColor: GREEN, // Build → Measure
  },
  {
    id: 's5',
    num: '05',
    title: 'Model Evaluation and Validation',
    description:
      'Offline + online eval: golden sets, LLM-as-judge, A/B tests, and red-teaming before any traffic shift.',
    metricLabel: 'Eval Coverage',
    metricValue: '87%',
    icon: BarChart3,
    color: GREEN,
    pathColor: GREEN,
  },
  {
    id: 's6',
    num: '06',
    title: 'Deployment and Integration',
    description:
      'Canary rollouts, feature flags, and integrations across the product surface. Ship with confidence, not crossed fingers.',
    metricLabel: 'Avg. Query Latency',
    metricValue: '< 100ms',
    icon: Sparkles,
    color: GREEN,
    pathColor: BLUE, // Measure → MLOps
  },
  {
    id: 's7',
    num: '07',
    title: 'Monitoring and Maintenance',
    description:
      'Drift detection, cost telemetry, and human feedback loops that feed the next cycle of problem identification.',
    metricLabel: 'Drift Alerts → Fix',
    metricValue: '< 1 day',
    icon: RefreshCw,
    color: BLUE,
    pathColor: CYAN, // back to Node 1 (closes loop)
  },
];

// ---------- Mobius / Infinity Geometry ----------
// Viewbox 1200 x 600. Two crossing lobes form the figure-eight.
// We place 7 nodes evenly along the closed loop using parametric sampling.
const VB_W = 1200;
const VB_H = 600;
const CX = 600;
const CY = 300;

// Lobe radii
const RX = 240; // horizontal radius
const RY = 170; // vertical radius

// Parametric infinity (Bernoulli-style figure 8) for nice node placement
// x(t) = CX + RX * sin(t)
// y(t) = CY + RY * sin(t) * cos(t)
function pointAt(t: number) {
  return {
    x: CX + RX * Math.sin(t) * 1.6,
    y: CY + RY * Math.sin(t) * Math.cos(t) * 1.4,
  };
}

// Build a smooth SVG path for the loop by sampling many points
function buildLoopPath(samples = 240) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    pts.push(pointAt(t));
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
}

// Build path between two t values — used per-segment so we can color each
function buildSegmentPath(t1: number, t2: number, samples = 40) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = t1 + ((t2 - t1) * i) / samples;
    pts.push(pointAt(t));
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
}

// ---------- Component ----------
const InfiniteLoopFlow = () => {
  const isMobile = useIsMobile();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>('s1');

  // Distribute 7 stages along t in [0, 2π)
  const positioned = useMemo(() => {
    const N = STAGES.length;
    return STAGES.map((s, i) => {
      const t = (i / N) * Math.PI * 2;
      const p = pointAt(t);
      const tNext = ((i + 1) / N) * Math.PI * 2;
      return { ...s, t, tNext, x: p.x, y: p.y };
    });
  }, []);

  const fullLoop = useMemo(() => buildLoopPath(), []);

  // ---------------- MOBILE: Nested Stack List ----------------
  if (isMobile) {
    return (
      <div className="relative w-full rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-4 overflow-hidden">
        {/* Vertical pulsing data flow on left edge */}
        <div className="absolute left-3 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-400/50 to-cyan-300/0" />
        <motion.div
          className="absolute left-[9px] w-1.5 h-1.5 rounded-full"
          style={{ background: CYAN, boxShadow: `0 0 10px ${CYAN}` }}
          animate={{ top: ['1rem', 'calc(100% - 1rem)'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative pl-6 space-y-2">
          {positioned.map((s) => {
            const open = openMobile === s.id;
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenMobile(open ? null : s.id)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl grid place-items-center text-white shrink-0"
                      style={{
                        background: s.color,
                        boxShadow: `0 0 14px ${s.color}55`,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] tracking-[0.2em] text-slate-500">
                        STAGE {s.num}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {s.title}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-slate-400 transition-transform shrink-0',
                      open && 'rotate-180',
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 space-y-3">
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {s.description}
                        </p>
                        <div
                          className="rounded-lg border p-3"
                          style={{
                            background: `${s.color}10`,
                            borderColor: `${s.color}40`,
                          }}
                        >
                          <div className="text-[10px] uppercase tracking-wider text-slate-500">
                            {s.metricLabel}
                          </div>
                          <div
                            className="text-lg font-bold"
                            style={{ color: s.color }}
                          >
                            {s.metricValue}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- DESKTOP: Mobius Loop of Light ----------------
  const isDimmed = (id: string) => hovered !== null && hovered !== id;
  const focused = positioned.find((p) => p.id === hovered) || null;

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[2/1] rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, hsl(220 15% 30%) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Floating drift wrapper for organic motion */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              {/* Soft neon glow */}
              <filter
                id={`glow-${uid}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Strong glow for hovered */}
              <filter
                id={`glow-strong-${uid}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Heartbeat radial gradient at center */}
              <radialGradient id={`heartbeat-${uid}`}>
                <stop offset="0%" stopColor={CYAN} stopOpacity="0.55" />
                <stop offset="100%" stopColor={CYAN} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Heartbeat pulse — slow expanding cyan glow every 10s */}
            <motion.circle
              cx={CX}
              cy={CY}
              fill={`url(#heartbeat-${uid})`}
              animate={{
                r: [0, 520],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />

            {/* Base loop — soft underlay */}
            <path
              d={fullLoop}
              fill="none"
              stroke="hsl(215 20% 75%)"
              strokeWidth="1"
              strokeOpacity="0.4"
            />

            {/* Per-segment colored connection paths */}
            {positioned.map((s, i) => {
              const segPath = buildSegmentPath(s.t, s.tNext);
              const dim = isDimmed(s.id) && isDimmed(positioned[(i + 1) % positioned.length].id);
              return (
                <g key={`seg-${s.id}`}>
                  <path
                    d={segPath}
                    fill="none"
                    stroke={s.pathColor}
                    strokeWidth={dim ? 1.2 : 2}
                    strokeOpacity={dim ? 0.18 : 0.65}
                    strokeLinecap="round"
                    filter={`url(#glow-${uid})`}
                    style={{ transition: 'all 400ms ease' }}
                  />
                  {/* Data packet flowing along the segment */}
                  <circle
                    r={dim ? 1.5 : 2.5}
                    fill="white"
                    opacity={dim ? 0.25 : 0.95}
                    filter={`url(#glow-${uid})`}
                  >
                    <animateMotion
                      dur={hovered ? '2.4s' : '4s'}
                      repeatCount="indefinite"
                      path={segPath}
                    />
                  </circle>
                </g>
              );
            })}

            {/* Center "Brain" core */}
            <g>
              <circle
                cx={CX}
                cy={CY}
                r="22"
                fill="white"
                stroke={CYAN}
                strokeWidth="1.5"
                opacity="0.9"
                filter={`url(#glow-${uid})`}
              />
              <text
                x={CX}
                y={CY + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="hsl(220 30% 25%)"
                style={{ letterSpacing: '0.15em' }}
              >
                AI
              </text>
            </g>

            {/* Nodes */}
            {positioned.map((s) => {
              const Icon = s.icon;
              const dim = isDimmed(s.id);
              const isFocus = hovered === s.id;
              const isApex = s.id === 's4';
              const r = isFocus ? 32 : isApex ? 30 : 26;
              return (
                <g
                  key={s.id}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    cursor: 'pointer',
                    opacity: dim ? 0.3 : 1,
                    transition: 'opacity 300ms ease',
                  }}
                >
                  {/* Halo */}
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={r + 8}
                    fill={s.color}
                    opacity={isFocus ? 0.25 : isApex ? 0.18 : 0.1}
                    filter={`url(#glow-strong-${uid})`}
                  />
                  {/* Glass body */}
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={r}
                    fill="white"
                    stroke={s.color}
                    strokeWidth={isFocus ? 2.5 : 1.5}
                    opacity={0.95}
                    filter={isFocus ? `url(#glow-strong-${uid})` : `url(#glow-${uid})`}
                  />
                  {/* Stage number */}
                  <text
                    x={s.x}
                    y={s.y - 4}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill={s.color}
                    style={{ letterSpacing: '0.15em' }}
                  >
                    {s.num}
                  </text>
                  {/* Icon (rendered via foreignObject for lucide) */}
                  <foreignObject
                    x={s.x - 9}
                    y={s.y + 1}
                    width="18"
                    height="18"
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <Icon className="w-4 h-4" color={s.color} />
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Floating "Drill-Down" Data Card */}
        <AnimatePresence>
          {focused && (
            <motion.div
              key={focused.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-6 max-w-md w-[88%] pointer-events-none"
            >
              <div
                className="rounded-2xl border bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-5"
                style={{ borderColor: `${focused.color}55` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] tracking-[0.2em] font-bold px-2 py-0.5 rounded"
                    style={{
                      background: `${focused.color}18`,
                      color: focused.color,
                    }}
                  >
                    STAGE {focused.num}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-slate-900 leading-snug mb-1">
                  {focused.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {focused.description}
                </p>
                <div
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{
                    background: `${focused.color}10`,
                    border: `1px solid ${focused.color}30`,
                  }}
                >
                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    {focused.metricLabel}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: focused.color }}
                  >
                    {focused.metricValue}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint label when nothing hovered */}
        {!focused && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 text-xs text-slate-500 tracking-[0.2em] uppercase">
            Hover a stage to drill down
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteLoopFlow;