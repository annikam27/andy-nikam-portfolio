import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Wand2, Bot, Workflow, Code2, Rocket, FlaskConical,
  Mic, Users, Brain, X, ChevronDown, Sparkles
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type Tool = { name: string; desc: string };
type Card = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: Tool[];
};
type Branch = {
  id: 'discovery' | 'agents' | 'delivery' | 'productivity';
  label: string;
  hue: string; // tailwind-friendly hex
  hueSoft: string;
  cards: Card[];
};

const BRANCHES: Branch[] = [
  {
    id: 'discovery',
    label: 'DISCOVERY',
    hue: '#22d3ee',
    hueSoft: 'rgba(34,211,238,0.18)',
    cards: [
      {
        id: 'customer-intel',
        title: 'Customer Intelligence',
        icon: Search,
        tools: [
          { name: 'Dovetail', desc: 'Centralizes qualitative research and surfaces themes across interviews.' },
          { name: 'Unwrap', desc: 'Aggregates feedback channels into prioritized product insights.' },
          { name: 'Monterey', desc: 'AI-native voice-of-customer for continuous discovery.' },
        ],
      },
      {
        id: 'prototyping',
        title: 'Prototyping',
        icon: Wand2,
        tools: [
          { name: 'Lovable', desc: 'Conversational full-stack prototyping for product teams.' },
          { name: 'v0', desc: 'Generative UI scaffolding from natural language.' },
          { name: 'Base44', desc: 'Rapid AI app builder for narrative-driven prototypes.' },
        ],
      },
    ],
  },
  {
    id: 'agents',
    label: 'AGENTS',
    hue: '#a855f7',
    hueSoft: 'rgba(168,85,247,0.18)',
    cards: [
      {
        id: 'simple-nocode',
        title: 'Simple (No-Code)',
        icon: Bot,
        tools: [
          { name: 'Zapier', desc: 'Trigger-action automations across thousands of apps.' },
          { name: 'Lindy', desc: 'AI assistants for repeatable knowledge tasks.' },
          { name: 'Relay', desc: 'Human-in-the-loop AI workflows.' },
          { name: 'Bardeen', desc: 'Browser automation with AI scrapers.' },
          { name: 'Parabola', desc: 'Visual data ops without writing code.' },
        ],
      },
      {
        id: 'full-featured',
        title: 'Full-Featured',
        icon: Workflow,
        tools: [
          { name: 'n8n', desc: 'Self-hostable workflow engine with deep branching.' },
          { name: 'make.com', desc: 'Visual scenario designer for complex orchestration.' },
          { name: 'Activepieces', desc: 'Open-source automation framework.' },
          { name: 'Workato', desc: 'Enterprise iPaaS with strong governance.' },
          { name: 'Tray.io', desc: 'API-first orchestration for product workflows.' },
        ],
      },
      {
        id: 'ai-coding',
        title: 'AI Coding',
        icon: Code2,
        tools: [
          { name: 'Linear', desc: 'Issue graph that feeds autonomous agents.' },
          { name: 'CodeGen', desc: 'Autonomous PR generation against your codebase.' },
          { name: 'Devin', desc: 'Long-horizon engineering agent.' },
          { name: 'Sweep', desc: 'Bug-fix agent triggered by issues.' },
          { name: 'Codium', desc: 'Test generation and code analysis agent.' },
        ],
      },
    ],
  },
  {
    id: 'delivery',
    label: 'DELIVERY',
    hue: '#10b981',
    hueSoft: 'rgba(16,185,129,0.18)',
    cards: [
      {
        id: 'vibe-coding',
        title: 'Vibe Coding',
        icon: Rocket,
        tools: [
          { name: 'Cursor', desc: 'AI-native IDE built around the editor.' },
          { name: 'Claude Code', desc: 'Agentic CLI for repository-scale changes.' },
          { name: 'OpenAI', desc: 'Foundation models powering coding workflows.' },
          { name: 'Replit', desc: 'Cloud workspace with AI pair programming.' },
          { name: 'Warp', desc: 'AI terminal for shell automation.' },
        ],
      },
      {
        id: 'vibe-experimentation',
        title: 'Vibe Experimentation',
        icon: FlaskConical,
        tools: [
          { name: 'Optimizely', desc: 'Enterprise experimentation and feature flags.' },
          { name: 'Amplitude', desc: 'Product analytics and experiment readout.' },
          { name: 'Kameleoon', desc: 'AI-driven personalization and A/B.' },
          { name: 'Pendo', desc: 'In-product guides and experimentation.' },
          { name: 'LaunchDarkly', desc: 'Feature management for safe shipping.' },
        ],
      },
    ],
  },
  {
    id: 'productivity',
    label: 'PRODUCTIVITY',
    hue: '#f59e0b',
    hueSoft: 'rgba(245,158,11,0.18)',
    cards: [
      {
        id: 'dictation',
        title: 'Dictation',
        icon: Mic,
        tools: [
          { name: 'Wispr', desc: 'Low-latency dictation for power users.' },
          { name: 'Speechify', desc: 'Voice synthesis and dictation.' },
          { name: 'Apple Whisper Native', desc: 'On-device transcription.' },
          { name: 'Tactiq', desc: 'Live meeting transcription.' },
        ],
      },
      {
        id: 'meetings',
        title: 'Meetings',
        icon: Users,
        tools: [
          { name: 'Granola', desc: 'AI notes that augment your own writing.' },
          { name: 'Fathom', desc: 'Recording and summarization for calls.' },
          { name: 'Otter.ai', desc: 'Live transcription with action items.' },
          { name: 'tl;dv', desc: 'Searchable meeting library.' },
          { name: 'Fireflies', desc: 'Conversation intelligence platform.' },
        ],
      },
      {
        id: 'general-llms',
        title: 'General LLMs',
        icon: Brain,
        tools: [
          { name: 'Claude', desc: 'Reasoning-strong assistant for PM thinking.' },
          { name: 'Notebook LM', desc: 'Grounded research over your sources.' },
          { name: 'GPT-5', desc: 'Frontier model for synthesis and code.' },
          { name: 'Gemini', desc: 'Multimodal reasoning across media.' },
        ],
      },
    ],
  },
];

// Polar layout (desktop)
// Center at (500, 360) inside 1000x720 viewBox.
// Each branch occupies a quadrant; cards arrayed along an arc.
const CENTER = { x: 500, y: 360 };
const BRANCH_ANGLES: Record<Branch['id'], number> = {
  discovery: 180,        // left
  agents: 235,           // bottom-left
  delivery: 325,         // top-right (image says top-right)
  productivity: 55,      // bottom-right -> use 55 reflected; we set explicit below
};
// Reassign for clarity matching brief: top-right=delivery, bottom-right=productivity,
// left=discovery, bottom-left=agents
const QUADRANT: Record<Branch['id'], { angle: number }> = {
  discovery: { angle: 180 },
  agents: { angle: 230 },
  delivery: { angle: 320 },
  productivity: { angle: 50 },
};

const BRANCH_RADIUS = 150;   // distance from center to branch hub
const CARD_RADIUS = 290;     // distance from center to category cards
const CARD_SPREAD = 38;      // degrees between cards within branch

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const InfiniteLoopFlow = () => {
  const isMobile = useIsMobile();
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [openBranch, setOpenBranch] = useState<string | null>('discovery');
  const [openCard, setOpenCard] = useState<string | null>(null);

  // Pre-compute card positions
  const positioned = useMemo(() => {
    return BRANCHES.map((b) => {
      const baseAngle = QUADRANT[b.id].angle;
      const hub = polar(CENTER.x, CENTER.y, BRANCH_RADIUS, baseAngle);
      const n = b.cards.length;
      const cards = b.cards.map((c, i) => {
        const offset = (i - (n - 1) / 2) * CARD_SPREAD;
        const a = baseAngle + offset;
        const pos = polar(CENTER.x, CENTER.y, CARD_RADIUS, a);
        return { ...c, x: pos.x, y: pos.y, angle: a };
      });
      return { ...b, hub, cards };
    });
  }, []);

  // ---------- MOBILE ACCORDION ----------
  if (isMobile) {
    return (
      <div className="relative w-full rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-4 overflow-hidden">
        {/* Vertical pulsing line on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-400/40 to-cyan-300/0" />
        <motion.div
          className="absolute left-[-3px] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Core */}
        <div className="relative pl-6 mb-4">
          <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-4 shadow-sm relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-70 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 30% 50%, rgba(0,242,255,0.18), transparent 60%)',
              }}
            />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900/90 grid place-items-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.2em] text-slate-500">CORE</div>
                <div className="font-semibold text-slate-900">AI-Native Product Brain</div>
              </div>
            </div>
          </div>
        </div>

        {positioned.map((b) => {
          const open = openBranch === b.id;
          return (
            <div key={b.id} className="relative pl-6 mb-3">
              <button
                onClick={() => setOpenBranch(open ? null : b.id)}
                className="w-full text-left rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-3 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: b.hue, boxShadow: `0 0 8px ${b.hue}` }}
                  />
                  <span className="text-xs tracking-[0.2em] font-semibold text-slate-700">
                    {b.label}
                  </span>
                </div>
                <ChevronDown
                  className={cn('w-4 h-4 text-slate-500 transition-transform', open && 'rotate-180')}
                />
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-2">
                      {b.cards.map((c) => {
                        const cOpen = openCard === c.id;
                        const Icon = c.icon;
                        return (
                          <div key={c.id} className="rounded-xl border border-slate-200 bg-white/80">
                            <button
                              onClick={() => setOpenCard(cOpen ? null : c.id)}
                              className="w-full flex items-center justify-between p-3"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 rounded-lg grid place-items-center text-white"
                                  style={{ background: b.hue }}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium text-slate-800">{c.title}</span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  'w-4 h-4 text-slate-400 transition-transform',
                                  cOpen && 'rotate-180'
                                )}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {cOpen && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden px-3 pb-3 space-y-2"
                                >
                                  {c.tools.map((t) => (
                                    <li
                                      key={t.name}
                                      className="rounded-lg border border-slate-200/70 bg-slate-50/70 p-2.5"
                                    >
                                      <div className="text-sm font-semibold text-slate-900">
                                        {t.name}
                                      </div>
                                      <div className="text-xs text-slate-600 mt-0.5">{t.desc}</div>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }

  // ---------- DESKTOP: INFINITE LOOP ----------
  // Build the mobius/infinity loop: two ellipses crossing at center
  // We use two SVG paths shaped like a horizontal infinity sign.
  const loopPath1 =
    'M 500 360 C 350 200, 150 200, 150 360 C 150 520, 350 520, 500 360';
  const loopPath2 =
    'M 500 360 C 650 200, 850 200, 850 360 C 850 520, 650 520, 500 360';

  const isFocused = (cardId: string) => hoveredCard === cardId;
  const dimmed = (cardId: string) => hoveredCard !== null && !isFocused(cardId);

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[10/7] rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, hsl(220 15% 30%) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <svg viewBox="0 0 1000 720" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,242,255,0.28)" />
              <stop offset="60%" stopColor="rgba(0,242,255,0.08)" />
              <stop offset="100%" stopColor="rgba(0,242,255,0)" />
            </radialGradient>
            <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glow Zone A behind core text */}
          <circle cx={CENTER.x} cy={CENTER.y} r="180" fill="url(#core-glow)" />

          {/* Infinity loop structural paths */}
          <path
            d={loopPath1}
            fill="none"
            stroke="hsl(215 20% 70%)"
            strokeWidth="1.5"
            strokeOpacity="0.55"
          />
          <path
            d={loopPath2}
            fill="none"
            stroke="hsl(215 20% 70%)"
            strokeWidth="1.5"
            strokeOpacity="0.55"
          />

          {/* Pulsing dots traveling outward along loop */}
          {[loopPath1, loopPath2].map((p, idx) => (
            <circle key={idx} r="3" fill="white" opacity="0.9" filter="url(#soft-glow)">
              <animateMotion dur="6s" repeatCount="indefinite" path={p} />
            </circle>
          ))}

          {/* Branch connection paths from center to each card */}
          {positioned.map((b) =>
            b.cards.map((c) => {
              const focused = isFocused(c.id);
              const branchHover = hoveredBranch === b.id;
              const isDim = dimmed(c.id) && !branchHover;
              const stroke = focused || branchHover ? b.hue : 'hsl(215 16% 65%)';
              const opacity = isDim ? 0.15 : focused ? 0.95 : branchHover ? 0.7 : 0.45;
              const d = `M ${CENTER.x} ${CENTER.y} Q ${
                (CENTER.x + c.x) / 2
              } ${(CENTER.y + c.y) / 2 - 30} ${c.x} ${c.y}`;
              return (
                <g key={`p-${c.id}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={focused ? 2 : 1.25}
                    strokeOpacity={opacity}
                    strokeDasharray="4 6"
                    className="transition-all duration-300"
                  />
                  <circle
                    r={focused ? 4 : 2.5}
                    fill={focused ? '#fde047' : 'white'}
                    opacity={isDim ? 0.2 : 0.95}
                    filter="url(#soft-glow)"
                  >
                    <animateMotion
                      dur={focused ? '1.6s' : '3.2s'}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                </g>
              );
            })
          )}
        </svg>

        {/* Core node */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: `${(CENTER.x / 1000) * 100}%`, top: `${(CENTER.y / 720) * 100}%` }}
        >
          <div className="relative">
            <div className="w-[180px] h-[180px] rounded-full border border-white/70 bg-white/55 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(8,47,73,0.25)] grid place-items-center text-center px-4">
              <div>
                <div className="w-10 h-10 mx-auto rounded-xl bg-slate-900/90 grid place-items-center text-white mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-[10px] tracking-[0.22em] text-slate-500">CORE</div>
                <div className="text-sm font-semibold text-slate-900 leading-tight mt-0.5">
                  AI-Native
                  <br />
                  Product Brain
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branch labels on hubs */}
        {positioned.map((b) => (
          <div
            key={`hub-${b.id}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{
              left: `${(b.hub.x / 1000) * 100}%`,
              top: `${(b.hub.y / 720) * 100}%`,
            }}
          >
            <div
              className="px-2.5 py-1 rounded-full text-[10px] tracking-[0.2em] font-semibold border backdrop-blur-md"
              style={{
                color: b.hue,
                borderColor: `${b.hue}55`,
                background: 'rgba(255,255,255,0.65)',
              }}
            >
              {b.label}
            </div>
          </div>
        ))}

        {/* Cards */}
        {positioned.map((b) =>
          b.cards.map((c) => {
            const Icon = c.icon;
            const focused = isFocused(c.id);
            const isDim = dimmed(c.id) && hoveredBranch !== b.id;
            return (
              <motion.button
                key={c.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: `${(c.x / 1000) * 100}%`,
                  top: `${(c.y / 720) * 100}%`,
                }}
                animate={{
                  y: [0, -4, 0],
                  opacity: isDim ? 0.35 : 1,
                  scale: focused ? 1.08 : 1,
                }}
                transition={{
                  y: { duration: 4 + (c.angle % 3), repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                onMouseEnter={() => {
                  setHoveredCard(c.id);
                  setHoveredBranch(b.id);
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoveredBranch(null);
                }}
                onClick={() => setActiveCard(c)}
              >
                <div
                  className="w-[124px] rounded-2xl border backdrop-blur-xl p-3 text-left shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    borderColor: focused ? b.hue : 'rgba(255,255,255,0.7)',
                    boxShadow: focused
                      ? `0 0 0 1px ${b.hue}55, 0 10px 40px -10px ${b.hueSoft}`
                      : undefined,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg grid place-items-center text-white"
                      style={{ background: b.hue }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div
                      className="text-[10px] tracking-[0.18em] font-semibold"
                      style={{ color: b.hue }}
                    >
                      {b.label.slice(0, 3)}
                    </div>
                  </div>
                  <div className="mt-2 text-[12px] font-semibold text-slate-900 leading-tight">
                    {c.title}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">{c.tools.length} tools</div>
                </div>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Drill-down modal */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-900/30 backdrop-blur-sm p-4"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/70 bg-white/85 backdrop-blur-2xl p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[10px] tracking-[0.22em] text-slate-500">CATEGORY</div>
                  <div className="text-lg font-semibold text-slate-900">{activeCard.title}</div>
                </div>
                <button
                  onClick={() => setActiveCard(null)}
                  className="w-8 h-8 rounded-full grid place-items-center text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                {activeCard.tools.map((t) => (
                  <li
                    key={t.name}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-3"
                  >
                    <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{t.desc}</div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfiniteLoopFlow;
