import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Code2,
  FileCode,
  Database,
  Cloud,
  Link2,
  Terminal,
  Figma,
  Sparkles,
} from 'lucide-react';

type Category = 'ai' | 'frontend' | 'backend' | 'database' | 'devtools' | 'design';

interface Tech {
  id: string;
  label: string;
  description: string;
  category: Category;
  Icon: React.ComponentType<{ className?: string }>;
}

const categoryColors: Record<Category, { stroke: string; glow: string; bg: string; text: string }> = {
  ai:       { stroke: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.5)',  bg: 'bg-purple-50',  text: 'text-purple-600' },
  frontend: { stroke: '#3B82F6', glow: 'rgba(59, 130, 246, 0.5)',  bg: 'bg-blue-50',    text: 'text-blue-600' },
  backend:  { stroke: '#14B8A6', glow: 'rgba(20, 184, 166, 0.5)',  bg: 'bg-teal-50',    text: 'text-teal-600' },
  database: { stroke: '#10B981', glow: 'rgba(16, 185, 129, 0.5)',  bg: 'bg-emerald-50', text: 'text-emerald-600' },
  devtools: { stroke: '#F97316', glow: 'rgba(249, 115, 22, 0.5)',  bg: 'bg-orange-50',  text: 'text-orange-600' },
  design:   { stroke: '#EC4899', glow: 'rgba(236, 72, 153, 0.5)',  bg: 'bg-pink-50',    text: 'text-pink-600' },
};

const categoryLabels: Record<Category, string> = {
  ai: 'AI / LLM',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devtools: 'Dev Tools',
  design: 'Design',
};

const techs: Tech[] = [
  { id: 'claude',    label: 'Claude API', category: 'ai',       Icon: Brain,    description: 'LLM backbone — reasoning, content generation' },
  { id: 'nextjs',    label: 'Next.js',    category: 'frontend', Icon: Code2,    description: 'Full-stack framework, SSR, API routes' },
  { id: 'ts',        label: 'TypeScript', category: 'frontend', Icon: FileCode, description: 'Type safety, scalable development' },
  { id: 'supabase',  label: 'Supabase',   category: 'database', Icon: Database, description: 'Realtime DB, auth, vector storage for AI' },
  { id: 'vercel',    label: 'Vercel',     category: 'backend',  Icon: Cloud,    description: 'Deployment, edge functions, AI integration' },
  { id: 'langchain', label: 'LangChain',  category: 'ai',       Icon: Link2,    description: 'AI orchestration, prompt chains, memory' },
  { id: 'cursor',    label: 'Cursor',     category: 'devtools', Icon: Terminal, description: 'AI-assisted development, code generation' },
  { id: 'figma',     label: 'Figma',      category: 'design',   Icon: Figma,    description: 'Design systems, specs, collaboration' },
];

const TechStackWeb = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredTech = techs.find(t => t.id === hovered);

  // Radial positions (percentages inside the container)
  const cx = 50;
  const cy = 50;
  const radius = 38;

  const positioned = techs.map((t, i) => {
    const angle = (i / techs.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...t,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    };
  });

  const categories = Array.from(new Set(techs.map(t => t.category))) as Category[];

  return (
    <div className="w-full">
      <div className="relative w-full aspect-square max-w-[560px] mx-auto">
        {/* SVG lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {positioned.map(t => {
              const c = categoryColors[t.category];
              return (
                <linearGradient key={`g-${t.id}`} id={`grad-${t.id}`} x1="50%" y1="50%" x2={`${t.x}%`} y2={`${t.y}%`}>
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor={c.stroke} stopOpacity="0.9" />
                </linearGradient>
              );
            })}
            <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {positioned.map((t, i) => {
            const active = hovered === t.id;
            const dim = hovered && !active;
            return (
              <motion.line
                key={t.id}
                x1={cx}
                y1={cy}
                x2={t.x}
                y2={t.y}
                stroke={`url(#grad-${t.id})`}
                strokeWidth={active ? 0.6 : 0.3}
                strokeLinecap="round"
                filter="url(#line-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: dim ? 0.25 : 1,
                }}
                transition={{
                  pathLength: { duration: 1.2, delay: 0.1 + i * 0.08, ease: 'easeOut' },
                  opacity: { duration: 0.3 },
                }}
              />
            );
          })}
        </svg>

        {/* Center node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl animate-pulse" />
            <div className="relative rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl px-4 py-4 sm:px-5 sm:py-5 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 text-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
              <span className="text-[10px] sm:text-xs font-semibold leading-tight">
                AI-Powered<br />Product<br />Solutions
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tech nodes */}
        {positioned.map((t, i) => {
          const c = categoryColors[t.category];
          const active = hovered === t.id;
          const dim = hovered && !active;
          const Icon = t.Icon;
          return (
            <motion.div
              key={t.id}
              className="absolute z-10"
              style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: dim ? 0.5 : 1 }}
              transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(t.id)}
              onBlur={() => setHovered(null)}
            >
              <button
                type="button"
                className="group flex flex-col items-center gap-1 outline-none"
                aria-label={`${t.label}: ${t.description}`}
              >
                <div
                  className={`relative rounded-full bg-white border transition-all duration-300 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${
                    active ? 'scale-110 border-transparent' : 'border-border'
                  }`}
                  style={{
                    boxShadow: active
                      ? `0 0 0 2px ${c.stroke}, 0 8px 24px ${c.glow}`
                      : `0 4px 12px rgba(0,0,0,0.06)`,
                  }}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${c.text}`} />
                </div>
                <span className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {t.label}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Description panel */}
      <div className="mt-6 min-h-[56px] max-w-xl mx-auto text-center px-4">
        {hoveredTech ? (
          <motion.div
            key={hoveredTech.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-sm font-semibold text-foreground">{hoveredTech.label}</div>
            <div className="text-sm text-muted-foreground">{hoveredTech.description}</div>
          </motion.div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Hover a technology to see its role in AI product development.
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {categories.map(cat => (
          <div key={cat} className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: categoryColors[cat].stroke }}
            />
            <span className="text-xs text-muted-foreground">{categoryLabels[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackWeb;