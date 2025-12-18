import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProductFlowDiagram = () => {
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  useEffect(() => {
    const runCycle = () => {
      setActiveConnections([]);
      const connections = ['research', 'define', 'design', 'build', 'measure', 'iterate'];
      connections.forEach((conn, i) => {
        setTimeout(() => {
          setActiveConnections(prev => [...prev, conn]);
        }, i * 800);
      });
    };

    runCycle();
    const interval = setInterval(runCycle, 7000);
    return () => clearInterval(interval);
  }, []);

  const elements = [
    { id: 'users', x: 12, y: 35, icon: '👥', label: 'User Research' },
    { id: 'data', x: 12, y: 65, icon: '📊', label: 'Data Analysis' },
    { id: 'problem', x: 30, y: 50, icon: '🎯', label: 'Problem Definition' },
    { id: 'solution', x: 48, y: 35, icon: '💡', label: 'Solution Design' },
    { id: 'prototype', x: 48, y: 65, icon: '🔧', label: 'Prototype' },
    { id: 'ship', x: 68, y: 50, icon: '🚀', label: 'Ship & Learn' },
    { id: 'metrics', x: 88, y: 50, icon: '📈', label: 'Measure Impact' }
  ];

  const connections = [
    { from: 'users', to: 'problem', id: 'research' },
    { from: 'data', to: 'problem', id: 'define' },
    { from: 'problem', to: 'solution', id: 'design' },
    { from: 'solution', to: 'prototype', id: 'build' },
    { from: 'prototype', to: 'ship', id: 'measure' },
    { from: 'ship', to: 'metrics', id: 'iterate' }
  ];

  return (
    <div className="relative w-full aspect-[2/1] min-h-[350px] max-h-[500px] bg-gradient-to-br from-muted/50 via-background to-primary/5 rounded-3xl overflow-hidden border border-border/50">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-border/30"
            style={{ left: `${i * 5}%` }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-border/30"
            style={{ top: `${i * 10}%` }}
          />
        ))}
      </div>

      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pm-connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
            <stop offset="100%" stopColor="hsl(262, 83%, 58%)" />
          </linearGradient>
        </defs>
        
        {connections.map((conn) => {
          const fromEl = elements.find(e => e.id === conn.from)!;
          const toEl = elements.find(e => e.id === conn.to)!;
          const isActive = activeConnections.includes(conn.id);

          // Calculate midpoint for curved path
          const midX = (fromEl.x + toEl.x) / 2;
          const midY = (fromEl.y + toEl.y) / 2;
          const curveOffset = Math.abs(fromEl.y - toEl.y) > 10 ? 0 : -8;

          return (
            <g key={conn.id}>
              {/* Background path */}
              <path
                d={`M ${fromEl.x}% ${fromEl.y}% Q ${midX}% ${midY + curveOffset}% ${toEl.x}% ${toEl.y}%`}
                stroke="hsl(var(--border))"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5 5"
              />

              {/* Active path */}
              <path
                d={`M ${fromEl.x}% ${fromEl.y}% Q ${midX}% ${midY + curveOffset}% ${toEl.x}% ${toEl.y}%`}
                stroke="url(#pm-connection-gradient)"
                strokeWidth={isActive ? "3" : "0"}
                fill="none"
                className="transition-all duration-500"
              >
                {isActive && (
                  <animate
                    attributeName="stroke-width"
                    values="2;4;2"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                )}
              </path>

              {/* Flowing particle */}
              {isActive && (
                <circle r="4" fill="hsl(217, 91%, 60%)">
                  <animateMotion
                    dur="0.8s"
                    repeatCount="1"
                    path={`M ${fromEl.x * 10} ${fromEl.y * 5} Q ${midX * 10} ${(midY + curveOffset) * 5} ${toEl.x * 10} ${toEl.y * 5}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Elements */}
      {elements.map((el, i) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
        >
          <div className="group cursor-pointer">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/40 to-purple-400/40 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />

            {/* Element box */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-background rounded-xl md:rounded-2xl shadow-lg border border-border group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
              <div className="flex flex-col items-center justify-center h-full p-1">
                <span className="text-xl sm:text-2xl md:text-3xl mb-0.5 md:mb-1">{el.icon}</span>
                <span className="text-[8px] sm:text-[10px] md:text-xs font-medium text-muted-foreground text-center px-1 leading-tight">
                  {el.label}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded" />
          <span className="hidden sm:inline">Active flow</span>
        </div>
      </div>
    </div>
  );
};

export default ProductFlowDiagram;
