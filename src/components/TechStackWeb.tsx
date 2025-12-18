import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TechStackWeb = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 8);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const techs = [
    { id: 'react', x: 50, y: 20, icon: '⚛️', label: 'React', connections: ['node', 'tailwind'] },
    { id: 'node', x: 50, y: 80, icon: '🟢', label: 'Node.js', connections: ['postgres', 'openai'] },
    { id: 'python', x: 15, y: 50, icon: '🐍', label: 'Python', connections: ['openai', 'aws'] },
    { id: 'openai', x: 85, y: 50, icon: '🤖', label: 'OpenAI', connections: ['react', 'node'] },
    { id: 'postgres', x: 30, y: 80, icon: '🐘', label: 'PostgreSQL', connections: ['node'] },
    { id: 'aws', x: 70, y: 80, icon: '☁️', label: 'AWS', connections: ['node', 'python'] },
    { id: 'tailwind', x: 15, y: 20, icon: '🎨', label: 'Tailwind', connections: ['react'] },
    { id: 'docker', x: 85, y: 20, icon: '🐳', label: 'Docker', connections: ['node', 'python'] }
  ];

  // Generate all unique connections
  const allConnections: { from: string; to: string }[] = [];
  techs.forEach(tech => {
    tech.connections.forEach(connId => {
      const connectionKey = [tech.id, connId].sort().join('-');
      if (!allConnections.some(c => [c.from, c.to].sort().join('-') === connectionKey)) {
        allConnections.push({ from: tech.id, to: connId });
      }
    });
  });

  return (
    <div className="relative w-full aspect-[3/2] min-h-[300px] max-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden border border-border/20">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full z-0" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="tech-connection-active" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
            <stop offset="100%" stopColor="hsl(262, 83%, 58%)" />
          </linearGradient>
        </defs>

        {allConnections.map(({ from, to }) => {
          const fromTech = techs.find(t => t.id === from)!;
          const toTech = techs.find(t => t.id === to)!;
          const isActive = hoveredTech === from || hoveredTech === to;

          return (
            <line
              key={`${from}-${to}`}
              x1={`${fromTech.x}%`}
              y1={`${fromTech.y}%`}
              x2={`${toTech.x}%`}
              y2={`${toTech.y}%`}
              stroke={isActive ? 'url(#tech-connection-active)' : 'rgba(255,255,255,0.1)'}
              strokeWidth={isActive ? '2' : '1'}
              className="transition-all duration-300"
            >
              {isActive && (
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;1;0.5"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}
      </svg>

      {/* Tech nodes */}
      {techs.map((tech, i) => (
        <motion.div
          key={tech.id}
          className="absolute z-10 cursor-pointer"
          style={{ left: `${tech.x}%`, top: `${tech.y}%`, transform: 'translate(-50%, -50%)' }}
          onHoverStart={() => setHoveredTech(tech.id)}
          onHoverEnd={() => setHoveredTech(null)}
          initial={{ scale: 0 }}
          animate={{
            scale: hoveredTech === tech.id ? 1.2 : (i === pulseIndex ? 1.1 : 1)
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative">
            {/* Pulse ring */}
            {i === pulseIndex && (
              <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
            )}

            {/* Tech bubble */}
            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 ${
              hoveredTech === tech.id
                ? 'bg-gradient-to-br from-primary to-purple-500'
                : 'bg-gradient-to-br from-gray-700 to-gray-600'
            }`}>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-lg sm:text-xl md:text-2xl">{tech.icon}</span>
              </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className={`text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
                hoveredTech === tech.id ? 'text-white' : 'text-white/70'
              }`}>
                {tech.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Title overlay */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <span className="text-xs sm:text-sm font-medium text-white/50">Tech Stack</span>
      </div>
    </div>
  );
};

export default TechStackWeb;
