import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Bot,
  Workflow,
  Code2,
  Rocket,
  Mic,
  Calendar,
  Database,
  Cloud,
  FlaskConical,
  Wand2,
  Cpu,
  GitBranch,
  Layers,
  MessageSquare,
} from 'lucide-react';

type Quadrant = 'discovery' | 'agents' | 'delivery' | 'productivity';
type Ring = 1 | 2 | 3;

interface Tool {
  id: string;
  name: string;
  role: string;
  Icon: React.ComponentType<{ className?: string }>;
  quadrant: Quadrant;
  ring: Ring;
  /** Position within quadrant: 0 = quadrant start edge, 1 = quadrant end edge */
  t: number;
}

const QUADRANT_META: Record<
  Quadrant,
  { label: string; sub: string; color: string; angleStart: number; angleEnd: number }
> = {
  // angles in degrees, 0 = right (east), 90 = bottom (south), going clockwise
  discovery: {
    label: 'DISCOVERY',
    sub: 'Prototyping & Intelligence',
    color: '#a855f7', // purple
    angleStart: 180,
    angleEnd: 270,
  },
  delivery: {
    label: 'DELIVERY',
    sub: 'Vibe Coding & Experimentation',
    color: '#3b82f6', // electric blue
    angleStart: 270,
    angleEnd: 360,
  },
  agents: {
    label: 'AGENTS',
    sub: 'Automation & AI Coding',
    color: '#22d3ee', // cyan
    angleStart: 90,
    angleEnd: 180,
  },
  productivity: {
    label: 'PRODUCTIVITY',
    sub: 'Dictation, Meetings & LLMs',
    color: '#f472b6', // pink
    angleStart: 0,
    angleEnd: 90,
  },
};

const RING_RADII: Record<Ring, number> = { 1: 130, 2: 220, 3: 310 };

const TOOLS: Tool[] = [
  // DISCOVERY (top-left)
  { id: 'lovable', name: 'Lovable', role: 'AI app prototyping in minutes', Icon: Sparkles, quadrant: 'discovery', ring: 1, t: 0.3 },
  { id: 'v0', name: 'v0', role: 'Generative UI from prompts', Icon: Wand2, quadrant: 'discovery', ring: 1, t: 0.7 },
  { id: 'monterey', name: 'Monterey', role: 'Customer feedback intelligence', Icon: Layers, quadrant: 'discovery', ring: 2, t: 0.5 },
  { id: 'launchdarkly', name: 'LaunchDarkly', role: 'Feature flags & experiments', Icon: GitBranch, quadrant: 'discovery', ring: 3, t: 0.5 },

  // DELIVERY (top-right)
  { id: 'cursor', name: 'Cursor', role: 'AI-native vibe coding IDE', Icon: Code2, quadrant: 'delivery', ring: 1, t: 0.3 },
  { id: 'claude-code', name: 'Claude Code', role: 'Agentic coding companion', Icon: Brain, quadrant: 'delivery', ring: 1, t: 0.7 },
  { id: 'supabase', name: 'Supabase', role: 'Realtime DB + pgvector', Icon: Database, quadrant: 'delivery', ring: 2, t: 0.5 },
  { id: 'vercel', name: 'Vercel', role: 'Edge deployment at scale', Icon: Cloud, quadrant: 'delivery', ring: 3, t: 0.5 },

  // AGENTS (bottom-left)
  { id: 'devin', name: 'Devin', role: 'Autonomous AI engineer', Icon: Bot, quadrant: 'agents', ring: 1, t: 0.3 },
  { id: 'replit', name: 'Replit Agent', role: 'AI app builder & runtime', Icon: Cpu, quadrant: 'agents', ring: 1, t: 0.7 },
  { id: 'n8n', name: 'n8n', role: 'Visual workflow automation', Icon: Workflow, quadrant: 'agents', ring: 2, t: 0.3 },
  { id: 'langchain', name: 'LangChain', role: 'Agent orchestration & memory', Icon: FlaskConical, quadrant: 'agents', ring: 2, t: 0.7 },

  // PRODUCTIVITY (bottom-right)
  { id: 'claude', name: 'Claude', role: 'Reasoning & long-context LLM', Icon: Brain, quadrant: 'productivity', ring: 1, t: 0.3 },
  { id: 'gpt5', name: 'GPT-5', role: 'Frontier multimodal model', Icon: Sparkles, quadrant: 'productivity', ring: 1, t: 0.7 },
  { id: 'granola', name: 'Granola', role: 'AI meeting notes', Icon: Calendar, quadrant: 'productivity', ring: 2, t: 0.3 },
  { id: 'wispr', name: 'Wispr Flow', role: 'Voice-first dictation', Icon: Mic, quadrant: 'productivity', ring: 2, t: 0.7 },
  { id: 'chatgpt', name: 'ChatGPT', role: 'Daily AI thinking partner', Icon: MessageSquare, quadrant: 'productivity', ring: 3, t: 0.5 },
];

const SIZE = 760;
const CENTER = SIZE / 2;
const HOVER_COLOR = '#fbbf24';

const polar = (angleDeg: number, r: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CENTER + Math.cos(a) * r, y: CENTER + Math.sin(a) * r };
};

const TechStackWeb = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const active = hovered ?? selected;

  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number; angle: number }> = {};
    TOOLS.forEach((tool) => {
      const q = QUADRANT_META[tool.quadrant];
      // Inset from quadrant edges so tools don't sit exactly on dividers
      const span = q.angleEnd - q.angleStart;
      const angle = q.angleStart + 0.15 * span + tool.t * 0.7 * span;
      const r = RING_RADII[tool.ring];
      const p = polar(angle, r);
      map[tool.id] = { ...p, angle };
    });
    return map;
  }, []);

  const activeTool = active ? TOOLS.find((t) => t.id === active) ?? null : null;

  return (
    <div className="relative w-full">
      <div
        className="relative rounded-3xl overflow-hidden border border-white/5"
        style={{
          background:
            'radial-gradient(ellipse at center, #0b1226 0%, #020617 70%)',
        }}
      >
        {/* Dot matrix blueprint */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(148,163,184,0.18) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 35%, rgba(2,6,23,0.9) 100%)',
          }}
        />

        {/* ===== Desktop / tablet: radar ===== */}
        <div className="hidden md:block relative aspect-square w-full max-w-[760px] mx-auto">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full">
            <defs>
              <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Concentric rings */}
            {[1, 2, 3].map((r) => (
              <circle
                key={r}
                cx={CENTER}
                cy={CENTER}
                r={RING_RADII[r as Ring]}
                fill="none"
                stroke="rgba(148,163,184,0.14)"
                strokeWidth={1}
                strokeDasharray="2 6"
              />
            ))}

            {/* Quadrant dividers (cross) */}
            <line
              x1={CENTER - 360}
              y1={CENTER}
              x2={CENTER + 360}
              y2={CENTER}
              stroke="rgba(148,163,184,0.1)"
              strokeWidth={1}
            />
            <line
              x1={CENTER}
              y1={CENTER - 360}
              x2={CENTER}
              y2={CENTER + 360}
              stroke="rgba(148,163,184,0.1)"
              strokeWidth={1}
            />

            {/* Quadrant labels */}
            {(Object.entries(QUADRANT_META) as [Quadrant, typeof QUADRANT_META[Quadrant]][]).map(
              ([key, q]) => {
                const mid = (q.angleStart + q.angleEnd) / 2;
                const p = polar(mid, 360);
                return (
                  <foreignObject
                    key={key}
                    x={p.x - 90}
                    y={p.y - 18}
                    width={180}
                    height={36}
                  >
                    <div className="text-center">
                      <div
                        className="text-[10px] font-mono tracking-[0.2em] font-semibold"
                        style={{ color: q.color, textShadow: `0 0 8px ${q.color}80` }}
                      >
                        {q.label}
                      </div>
                      <div className="text-[9px] text-white/40 mt-0.5">{q.sub}</div>
                    </div>
                  </foreignObject>
                );
              }
            )}

            {/* Connection lines + data pulses */}
            {TOOLS.map((tool, idx) => {
              const p = positions[tool.id];
              const q = QUADRANT_META[tool.quadrant];
              const isActive = active === tool.id;
              const isDimmed = active && !isActive;
              const stroke = isActive ? HOVER_COLOR : q.color;
              return (
                <g key={`line-${tool.id}`}>
                  <motion.line
                    x1={CENTER}
                    y1={CENTER}
                    x2={p.x}
                    y2={p.y}
                    stroke={stroke}
                    strokeWidth={isActive ? 1.6 : 0.7}
                    strokeLinecap="round"
                    filter="url(#soft-glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: isDimmed ? 0.1 : isActive ? 1 : 0.4,
                    }}
                    transition={{
                      pathLength: { duration: 1.2, delay: 0.2 + tool.ring * 0.15, ease: 'easeOut' },
                      opacity: { duration: 0.3 },
                    }}
                  />
                  {/* Data pulse traveling outward */}
                  <motion.circle
                    r={2}
                    fill={stroke}
                    filter="url(#soft-glow)"
                    animate={{
                      cx: [CENTER, p.x],
                      cy: [CENTER, p.y],
                      opacity: isDimmed ? [0, 0.3, 0] : [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      delay: idx * 0.18,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </g>
              );
            })}

            {/* Heartbeat pulse rings */}
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
                initial={{ scale: 0.4, opacity: 0.5 }}
                animate={{ scale: 5, opacity: 0 }}
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
            <circle cx={CENTER} cy={CENTER} r={75} fill="url(#core-grad)" filter="url(#strong-glow)" />
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={32}
              fill="#020617"
              stroke="#a855f7"
              strokeWidth={1.5}
              filter="url(#soft-glow)"
              animate={{ r: [32, 36, 32] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <foreignObject x={CENTER - 95} y={CENTER - 22} width={190} height={44}>
              <div className="text-center text-[11px] font-mono tracking-wider text-white/90">
                <div className="flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-purple-300" />
                  <span className="font-semibold">CORE</span>
                </div>
                <div className="text-[9px] text-white/60 mt-0.5">AI-Native Product Brain</div>
              </div>
            </foreignObject>

            {/* Tool nodes */}
            {TOOLS.map((tool, idx) => {
              const p = positions[tool.id];
              const q = QUADRANT_META[tool.quadrant];
              const isActive = active === tool.id;
              const isDimmed = active && !isActive;
              const Icon = tool.Icon;
              const color = isActive ? HOVER_COLOR : q.color;
              const scale = isActive ? 1.15 : isDimmed ? 0.92 : 1;
              return (
                <motion.g
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: isDimmed ? 0.35 : 1, scale }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + idx * 0.05,
                    ease: 'easeOut',
                  }}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: `${p.x}px ${p.y}px`,
                    transformBox: 'fill-box',
                  }}
                  onMouseEnter={() => setHovered(tool.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() =>
                    setSelected((s) => (s === tool.id ? null : tool.id))
                  }
                >
                  <motion.g
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 4 + (idx % 3),
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.18,
                    }}
                  >
                    {/* Aura on hover */}
                    {isActive && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={42}
                        fill={HOVER_COLOR}
                        opacity={0.15}
                        filter="url(#strong-glow)"
                      />
                    )}
                    {/* Glassmorphism circle */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 28 : 24}
                      fill="rgba(15,23,42,0.7)"
                      stroke={color}
                      strokeWidth={isActive ? 1.8 : 1}
                      filter="url(#soft-glow)"
                    />
                    <foreignObject x={p.x - 11} y={p.y - 11} width={22} height={22}>
                      <div
                        className="w-[22px] h-[22px] flex items-center justify-center"
                        style={{ color }}
                      >
                        <Icon className="w-[18px] h-[18px]" />
                      </div>
                    </foreignObject>
                    {/* Label */}
                    <foreignObject x={p.x - 60} y={p.y + 28} width={120} height={18}>
                      <div
                        className="text-center text-[10px] font-mono tracking-wide whitespace-nowrap"
                        style={{
                          color: isActive ? HOVER_COLOR : 'rgba(226,232,240,0.85)',
                        }}
                      >
                        {tool.name}
                      </div>
                    </foreignObject>
                  </motion.g>
                </motion.g>
              );
            })}
          </svg>

          {/* Floating tooltip */}
          <AnimatePresence>
            {activeTool && (
              <motion.div
                key={activeTool.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
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
                      style={{
                        backgroundColor: HOVER_COLOR,
                        boxShadow: `0 0 8px ${HOVER_COLOR}`,
                      }}
                    />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                      {QUADRANT_META[activeTool.quadrant].label} · Ring {activeTool.ring}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{activeTool.name}</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">{activeTool.role}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== Mobile: vertical stack list ===== */}
        <div className="md:hidden relative px-4 py-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-white/90">
              <Sparkles className="w-3 h-3 text-purple-300" />
              <span className="font-semibold">CORE · AI-Native Product Brain</span>
            </div>
          </div>
          <div className="relative pl-6 space-y-6">
            {/* Pulsing left border line */}
            <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/0 via-purple-500/60 to-blue-500/0" />
            <motion.div
              className="absolute left-[5px] w-1.5 h-1.5 rounded-full bg-amber-400"
              style={{ boxShadow: '0 0 8px #fbbf24' }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {(Object.keys(QUADRANT_META) as Quadrant[]).map((qKey) => {
              const q = QUADRANT_META[qKey];
              const tools = TOOLS.filter((t) => t.quadrant === qKey);
              return (
                <div key={qKey}>
                  <div
                    className="text-[10px] font-mono tracking-[0.2em] font-semibold mb-2"
                    style={{ color: q.color }}
                  >
                    {q.label}
                    <span className="text-white/40 ml-2 tracking-normal font-normal">{q.sub}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {tools.map((tool) => {
                      const Icon = tool.Icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() =>
                            setSelected((s) => (s === tool.id ? null : tool.id))
                          }
                          className="flex items-start gap-2 rounded-lg border border-white/10 bg-slate-900/60 p-2.5 text-left backdrop-blur"
                        >
                          <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: q.color }} />
                          <div className="min-w-0">
                            <div className="text-[11px] font-medium text-white truncate">
                              {tool.name}
                            </div>
                            <div className="text-[9px] text-white/50 leading-tight line-clamp-2">
                              {tool.role}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="relative px-6 pb-5 pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-mono text-white/60">
          {(Object.keys(QUADRANT_META) as Quadrant[]).map((k) => (
            <div key={k} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: QUADRANT_META[k].color,
                  boxShadow: `0 0 6px ${QUADRANT_META[k].color}`,
                }}
              />
              <span>{QUADRANT_META[k].label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Hover any tool to trace its signal back to the core. Click to pin.
      </p>
    </div>
  );
};

export default TechStackWeb;