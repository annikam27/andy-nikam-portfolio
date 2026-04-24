import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// ===== Data Model =====
type Tool = { name: string; desc: string };
type Activity = { name: string; tools: Tool[] };
type Phase = {
  id: string;
  name: string;
  angle: number; // center angle in degrees
  hue: string; // master hue (hex)
  activities: Activity[];
};

const PHASES: Phase[] = [
  {
    id: 'discovery',
    name: 'DISCOVERY',
    angle: -135,
    hue: '#22d3ee',
    activities: [
      {
        name: 'Customer Intelligence',
        tools: [
          { name: 'Dovetail', desc: 'Research repository & insights' },
          { name: 'Unwrap', desc: 'Customer feedback synthesis' },
          { name: 'Monterey', desc: 'AI-powered user signals' },
        ],
      },
      {
        name: 'Prototyping',
        tools: [
          { name: 'Lovable', desc: 'AI full-stack prototyping' },
          { name: 'v0', desc: 'Generative UI scaffolding' },
          { name: 'Base44', desc: 'Rapid app composition' },
        ],
      },
    ],
  },
  {
    id: 'agents',
    name: 'AGENTS',
    angle: -45,
    hue: '#a855f7',
    activities: [
      {
        name: 'Simple',
        tools: [
          { name: 'Zapier', desc: 'No-code automation flows' },
          { name: 'Parabola', desc: 'Visual data pipelines' },
        ],
      },
      {
        name: 'Full-Featured',
        tools: [
          { name: 'n8n', desc: 'Open-source agent workflows' },
          { name: 'Workato', desc: 'Enterprise orchestration' },
        ],
      },
      {
        name: 'AI Coding',
        tools: [
          { name: 'CodeGen', desc: 'Autonomous engineering agents' },
          { name: 'Linear', desc: 'AI-assisted issue triage' },
        ],
      },
    ],
  },
  {
    id: 'delivery',
    name: 'DELIVERY',
    angle: 45,
    hue: '#10b981',
    activities: [
      {
        name: 'Vibe Coding',
        tools: [
          { name: 'Cursor', desc: 'AI-pair coding IDE' },
          { name: 'Claude Code', desc: 'Terminal-native agent' },
          { name: 'Replit', desc: 'Cloud-native dev agent' },
        ],
      },
      {
        name: 'Vibe Experimentation',
        tools: [
          { name: 'Optimizely', desc: 'A/B & feature flags' },
          { name: 'Amplitude', desc: 'Product analytics' },
          { name: 'Pendo', desc: 'In-product guidance' },
        ],
      },
    ],
  },
  {
    id: 'productivity',
    name: 'PRODUCTIVITY',
    angle: 135,
    hue: '#f59e0b',
    activities: [
      {
        name: 'Dictation',
        tools: [
          { name: 'Wispr', desc: 'Voice-first capture' },
          { name: 'Speechify', desc: 'Listen & review' },
        ],
      },
      {
        name: 'Meetings',
        tools: [
          { name: 'Fireflies', desc: 'Meeting intelligence' },
          { name: 'Otter', desc: 'Live transcription' },
          { name: 'Granola', desc: 'AI meeting notes' },
        ],
      },
      {
        name: 'General LLMs',
        tools: [
          { name: 'Claude', desc: 'Reasoning & long context' },
          { name: 'Notebook LM', desc: 'Source-grounded synthesis' },
          { name: 'GPT', desc: 'Generalist assistant' },
          { name: 'Gemini', desc: 'Multimodal reasoning' },
        ],
      },
    ],
  },
];

// ===== Geometry =====
const VB = 1000; // viewBox size
const C = VB / 2;
const R_PHASE = 180;
const R_ACTIVITY = 320;
const R_TOOL = 440;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const polar = (angle: number, r: number) => ({
  x: C + Math.cos(toRad(angle)) * r,
  y: C + Math.sin(toRad(angle)) * r,
});

// Spread activities within a phase's quadrant (90° wedge)
function activityAngle(phaseAngle: number, idx: number, total: number) {
  const wedge = 70; // degrees of usable wedge per phase
  if (total === 1) return phaseAngle;
  const step = wedge / (total - 1);
  return phaseAngle - wedge / 2 + step * idx;
}

function toolAngle(activityAng: number, idx: number, total: number) {
  const wedge = total <= 2 ? 14 : total === 3 ? 22 : 30;
  if (total === 1) return activityAng;
  const step = wedge / (total - 1);
  return activityAng - wedge / 2 + step * idx;
}

// ===== Desktop SVG View =====
const CelestialMap = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const layout = useMemo(() => {
    return PHASES.map((phase) => {
      const phasePos = polar(phase.angle, R_PHASE);
      const activities = phase.activities.map((act, i) => {
        const aAng = activityAngle(phase.angle, i, phase.activities.length);
        const aPos = polar(aAng, R_ACTIVITY);
        const tools = act.tools.map((t, j) => {
          const tAng = toolAngle(aAng, j, act.tools.length);
          const tPos = polar(tAng, R_TOOL);
          return { ...t, pos: tPos, angle: tAng };
        });
        return { ...act, pos: aPos, angle: aAng, tools };
      });
      return { ...phase, pos: phasePos, activities };
    });
  }, []);

  const isDimmed = (phaseId: string) => activePhase !== null && activePhase !== phaseId;

  return (
    <div className="relative w-full aspect-square max-w-[720px] mx-auto">
      {/* Background */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at center, #0b1224 0%, #030712 70%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(148,163,184,0.5) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* faint stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/40"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="relative w-full h-full"
        onMouseLeave={() => {
          setActivePhase(null);
          setActiveTool(null);
        }}
      >
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#a5b4fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flareGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="planetGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0.6)" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric guide rings */}
        {[R_PHASE, R_ACTIVITY, R_TOOL].map((r) => (
          <circle
            key={r}
            cx={C}
            cy={C}
            r={r}
            fill="none"
            stroke="rgba(148,163,184,0.08)"
            strokeDasharray="2 6"
          />
        ))}

        {/* Connections */}
        {layout.map((phase) => {
          const dim = isDimmed(phase.id);
          const op = dim ? 0.08 : 0.55;
          return (
            <g key={`conn-${phase.id}`}>
              {/* Core -> Phase */}
              <line
                x1={C}
                y1={C}
                x2={phase.pos.x}
                y2={phase.pos.y}
                stroke="rgba(186,230,253,0.6)"
                strokeWidth={1.2}
                strokeOpacity={op}
              />
              {/* Pulsing dot from core to phase */}
              {!dim && (
                <circle r="2.5" fill="#ffffff" opacity="0.9">
                  <animateMotion
                    dur={`${3 + (phase.angle % 2 === 0 ? 0.5 : 0)}s`}
                    repeatCount="indefinite"
                    path={`M ${C} ${C} L ${phase.pos.x} ${phase.pos.y}`}
                  />
                </circle>
              )}

              {phase.activities.map((act, ai) => (
                <g key={`a-${phase.id}-${ai}`}>
                  <line
                    x1={phase.pos.x}
                    y1={phase.pos.y}
                    x2={act.pos.x}
                    y2={act.pos.y}
                    stroke="rgba(186,230,253,0.5)"
                    strokeWidth={1}
                    strokeOpacity={op}
                  />
                  {act.tools.map((tool, ti) => {
                    const isFocused = activeTool === `${phase.id}-${ai}-${ti}`;
                    return (
                      <g key={`t-${phase.id}-${ai}-${ti}`}>
                        <line
                          x1={act.pos.x}
                          y1={act.pos.y}
                          x2={tool.pos.x}
                          y2={tool.pos.y}
                          stroke={
                            isFocused
                              ? '#fbbf24'
                              : 'rgba(186,230,253,0.4)'
                          }
                          strokeWidth={isFocused ? 1.6 : 0.8}
                          strokeOpacity={isFocused ? 1 : op}
                        />
                        {!dim && (
                          <circle
                            r={isFocused ? 3.5 : 1.8}
                            fill={isFocused ? '#fde68a' : '#ffffff'}
                            opacity={isFocused ? 1 : 0.85}
                          >
                            <animateMotion
                              dur={isFocused ? '1.2s' : '2.6s'}
                              repeatCount="indefinite"
                              path={`M ${C} ${C} L ${phase.pos.x} ${phase.pos.y} L ${act.pos.x} ${act.pos.y} L ${tool.pos.x} ${tool.pos.y}`}
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </g>
              ))}
            </g>
          );
        })}

        {/* Core */}
        <g>
          <circle cx={C} cy={C} r={90} fill="url(#coreGrad)" opacity={0.6}>
            <animate
              attributeName="r"
              values="86;100;86"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={C} cy={C} r={42} fill="url(#coreGrad)" filter="url(#glow)" />
          <text
            x={C}
            y={C - 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#0b1224"
            letterSpacing="0.08em"
          >
            AI NATIVE
          </text>
          <text
            x={C}
            y={C + 10}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="#0b1224"
            letterSpacing="0.12em"
          >
            PRODUCT CORE
          </text>
        </g>

        {/* Phase nodes (Solar Flares) */}
        {layout.map((phase) => {
          const dim = isDimmed(phase.id);
          const active = activePhase === phase.id;
          return (
            <g
              key={`phase-${phase.id}`}
              style={{ cursor: 'pointer', opacity: dim ? 0.2 : 1, transition: 'opacity 300ms' }}
              onMouseEnter={() => setActivePhase(phase.id)}
              onClick={() => setActivePhase(phase.id)}
            >
              <circle
                cx={phase.pos.x}
                cy={phase.pos.y}
                r={active ? 46 : 38}
                fill="url(#flareGrad)"
                opacity={0.6}
              />
              <circle
                cx={phase.pos.x}
                cy={phase.pos.y}
                r={20}
                fill="rgba(255,255,255,0.95)"
                filter="url(#glow)"
              />
              <text
                x={phase.pos.x}
                y={phase.pos.y + 3}
                textAnchor="middle"
                fontSize="8"
                fontWeight="800"
                fill="#0b1224"
                letterSpacing="0.1em"
              >
                {phase.name}
              </text>
            </g>
          );
        })}

        {/* Activity nodes (Orbit points of light) */}
        {layout.map((phase) => {
          const dim = isDimmed(phase.id);
          return phase.activities.map((act, ai) => (
            <g
              key={`act-${phase.id}-${ai}`}
              style={{ opacity: dim ? 0.15 : 1, transition: 'opacity 300ms' }}
            >
              <circle
                cx={act.pos.x}
                cy={act.pos.y}
                r={9}
                fill="#3b82f6"
                opacity={0.25}
              />
              <circle cx={act.pos.x} cy={act.pos.y} r={3.5} fill="#60a5fa" />
              <text
                x={act.pos.x}
                y={act.pos.y - 14}
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="#cbd5e1"
              >
                {act.name}
              </text>
            </g>
          ));
        })}

        {/* Tool nodes (Glassmorphism planets) */}
        {layout.map((phase) => {
          const dim = isDimmed(phase.id);
          return phase.activities.map((act, ai) =>
            act.tools.map((tool, ti) => {
              const id = `${phase.id}-${ai}-${ti}`;
              const focused = activeTool === id;
              const tx = tool.pos.x;
              const ty = tool.pos.y;
              // Label offset radially outward
              const outward = polar(tool.angle, R_TOOL + 38);
              return (
                <g
                  key={`tool-${id}`}
                  style={{
                    opacity: dim ? 0.15 : 1,
                    transition: 'opacity 300ms',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => {
                    setActivePhase(phase.id);
                    setActiveTool(id);
                  }}
                  onMouseLeave={() => setActiveTool(null)}
                >
                  <circle
                    cx={tx}
                    cy={ty}
                    r={focused ? 22 : 16}
                    fill="url(#planetGrad)"
                    stroke={focused ? '#fbbf24' : 'rgba(255,255,255,0.35)'}
                    strokeWidth={focused ? 1.4 : 0.8}
                  />
                  <circle
                    cx={tx - 4}
                    cy={ty - 5}
                    r={focused ? 5 : 3.5}
                    fill="rgba(255,255,255,0.55)"
                  />
                  <text
                    x={outward.x}
                    y={outward.y}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill={focused ? '#fde68a' : '#e2e8f0'}
                  >
                    {tool.name}
                  </text>
                  {focused && (
                    <text
                      x={outward.x}
                      y={outward.y + 12}
                      textAnchor="middle"
                      fontSize="8"
                      fill="#94a3b8"
                    >
                      {tool.desc}
                    </text>
                  )}
                </g>
              );
            })
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400">
        <Sparkles className="w-3 h-3 text-amber-300" />
        Hover a phase or tool to focus
      </div>
    </div>
  );
};

// ===== Mobile Accordion View =====
const MobileAccordion = () => {
  const [openPhase, setOpenPhase] = useState<string | null>('discovery');
  const [openActivity, setOpenActivity] = useState<string | null>(null);

  return (
    <div className="relative rounded-3xl p-4 sm:p-6 bg-[#030712] border border-white/10 overflow-hidden">
      {/* vertical pulse rail */}
      <div className="absolute left-2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-blue-400/40 to-transparent">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Core */}
      <div className="relative pl-6 mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 text-[#0b1224] text-xs font-bold tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          AI NATIVE PRODUCT CORE
        </div>
      </div>

      <div className="relative pl-6 space-y-2">
        {PHASES.map((phase) => {
          const isOpen = openPhase === phase.id;
          return (
            <div
              key={phase.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenPhase(isOpen ? null : phase.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-sm font-bold tracking-widest text-white">
                  {phase.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 pb-3 space-y-2"
                  >
                    {phase.activities.map((act) => {
                      const aId = `${phase.id}-${act.name}`;
                      const aOpen = openActivity === aId;
                      return (
                        <div
                          key={aId}
                          className="rounded-lg border border-blue-400/20 bg-blue-500/[0.06]"
                        >
                          <button
                            onClick={() =>
                              setOpenActivity(aOpen ? null : aId)
                            }
                            className="w-full flex items-center justify-between px-3 py-2 text-left"
                          >
                            <span className="text-xs font-semibold text-blue-200">
                              {act.name}
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-blue-300 transition-transform ${
                                aOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {aOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="px-3 pb-3 space-y-2"
                              >
                                {act.tools.map((tool) => (
                                  <li
                                    key={tool.name}
                                    className="flex items-start gap-3 p-2 rounded-md bg-white/[0.04] border border-white/10"
                                  >
                                    <div className="mt-0.5 w-7 h-7 rounded-full bg-gradient-to-br from-white/70 to-slate-700/50 border border-white/20 shrink-0" />
                                    <div>
                                      <div className="text-xs font-semibold text-white">
                                        {tool.name}
                                      </div>
                                      <div className="text-[11px] text-slate-400">
                                        {tool.desc}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===== Root =====
const TechStackWeb = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-full aspect-square max-w-[720px] mx-auto" />;
  return isMobile ? <MobileAccordion /> : <CelestialMap />;
};

export default TechStackWeb;