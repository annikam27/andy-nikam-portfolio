import { useState } from 'react';
import { motion } from 'framer-motion';
import { Figma, Terminal, MessageSquare, Code2, FileCode, Link2, Brain, Database, Zap, Cloud, Activity, Gauge } from 'lucide-react';

interface TechItem {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}

interface Layer {
  id: string;
  title: string;
  subtitle: string;
  latency: string;
  gradient: string;
  border: string;
  accent: string;
  iconBg: string;
  items: TechItem[];
}

const layers: Layer[] = [
  {
    id: 'design',
    title: 'Product & Design',
    subtitle: 'Where ideas become designs and specifications',
    latency: 'Iteration: hours → minutes',
    gradient: 'from-sky-100 to-blue-100',
    border: 'border-sky-300/60',
    accent: 'text-sky-700',
    iconBg: 'bg-sky-500/10 text-sky-600',
    items: [
      { Icon: Figma, label: 'Figma', desc: 'Design systems & specs' },
      { Icon: Terminal, label: 'Cursor', desc: 'AI-assisted development' },
      { Icon: MessageSquare, label: 'Feedback Loops', desc: 'User research & iteration' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & Logic',
    subtitle: 'Where designs become interactive, intelligent applications',
    latency: 'Render: <100ms TTI',
    gradient: 'from-blue-100 to-indigo-100',
    border: 'border-indigo-300/60',
    accent: 'text-indigo-700',
    iconBg: 'bg-indigo-500/10 text-indigo-600',
    items: [
      { Icon: Code2, label: 'Next.js', desc: 'SSR, routing, API layer' },
      { Icon: FileCode, label: 'TypeScript', desc: 'Type-safe scale' },
      { Icon: Link2, label: 'LangChain', desc: 'Prompt orchestration' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data',
    subtitle: 'Where AI reasoning powers personalized, context-aware features',
    latency: 'Inference: ~800ms p50',
    gradient: 'from-indigo-100 to-purple-100',
    border: 'border-purple-300/60',
    accent: 'text-purple-700',
    iconBg: 'bg-purple-500/10 text-purple-600',
    items: [
      { Icon: Brain, label: 'Claude API', desc: 'LLM reasoning engine' },
      { Icon: Database, label: 'Supabase', desc: 'Vector + realtime DB' },
      { Icon: Zap, label: 'Realtime Sync', desc: 'Live context streams' },
    ],
  },
  {
    id: 'infra',
    title: 'Infrastructure & Deployment',
    subtitle: 'Where products scale to users globally with minimal latency',
    latency: 'Edge: <50ms global',
    gradient: 'from-purple-100 to-blue-200',
    border: 'border-blue-400/60',
    accent: 'text-blue-800',
    iconBg: 'bg-blue-600/10 text-blue-700',
    items: [
      { Icon: Cloud, label: 'Vercel Edge', desc: 'Global edge functions' },
      { Icon: Gauge, label: 'API Scaling', desc: 'Autoscale on demand' },
      { Icon: Activity, label: 'Monitoring', desc: 'Observability & alerts' },
    ],
  },
];

const TechStackWeb = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* Flowing particles (vertical) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                background: 'radial-gradient(circle, rgba(139,92,246,0.9) 0%, rgba(59,130,246,0) 70%)',
                boxShadow: '0 0 8px rgba(139,92,246,0.8)',
              }}
              initial={{ top: '-5%', opacity: 0 }}
              animate={{ top: '105%', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 4.5,
                delay: i * 0.9,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute w-px h-16"
              style={{
                left: `${35 + i * 20}%`,
                background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.6), transparent)',
              }}
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{
                duration: 5,
                delay: i * 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col gap-3">
          {layers.map((layer, idx) => {
            const isHovered = hovered === layer.id;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
                onMouseEnter={() => setHovered(layer.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-2xl border backdrop-blur-sm bg-gradient-to-br ${layer.gradient} ${layer.border} transition-all duration-300 ${
                  isHovered ? 'shadow-xl scale-[1.01]' : 'shadow-sm'
                }`}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono uppercase tracking-wider ${layer.accent}`}>
                          Layer {idx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">•</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{layer.latency}</span>
                      </div>
                      <h3 className={`text-lg sm:text-xl font-semibold ${layer.accent}`}>{layer.title}</h3>
                      <p className="text-xs sm:text-sm text-foreground/70 mt-1">{layer.subtitle}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {layer.items.map((item) => {
                      const Icon = item.Icon;
                      return (
                        <div
                          key={item.label}
                          className="rounded-xl bg-white/60 border border-white/80 p-3 transition-all duration-300 hover:bg-white/90"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${layer.iconBg}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-xs font-semibold text-foreground leading-tight">{item.label}</div>
                          <motion.div
                            initial={false}
                            animate={{
                              height: isHovered ? 'auto' : 0,
                              opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="text-[10px] text-muted-foreground mt-1 leading-snug">{item.desc}</div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Connector arrow between layers */}
                {idx < layers.length - 1 && (
                  <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 z-10">
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-6 h-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Hover a layer to reveal the workflow details.
      </p>
    </div>
  );
};

export default TechStackWeb;
