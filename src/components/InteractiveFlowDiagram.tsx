import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveFlowDiagram = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [activePath, setActivePath] = useState(0);

  // Auto-animate through nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 6);
      setActivePath((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 'chaos', x: 100, y: 200, label: 'Complex Problem', icon: '🔀', color: 'from-red-500 to-orange-500' },
    { id: 'analysis', x: 300, y: 100, label: 'Analysis', icon: '🔍', color: 'from-orange-500 to-yellow-500' },
    { id: 'strategy', x: 500, y: 150, label: 'Strategy', icon: '📋', color: 'from-yellow-500 to-green-500' },
    { id: 'build', x: 700, y: 100, label: 'Build', icon: '🛠️', color: 'from-green-500 to-blue-500' },
    { id: 'measure', x: 900, y: 200, label: 'Measure', icon: '📊', color: 'from-blue-500 to-indigo-500' },
    { id: 'clarity', x: 1100, y: 200, label: 'Clear Solution', icon: '✨', color: 'from-indigo-500 to-purple-500' }
  ];

  // Scale nodes for responsive container (viewBox 1200x400)
  const viewBoxWidth = 1200;
  const viewBoxHeight = 400;

  return (
    <div className="relative w-full aspect-[3/1] min-h-[300px] max-h-[400px] bg-gradient-to-br from-muted/50 to-background rounded-3xl overflow-hidden border border-border/50">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* SVG for paths and nodes */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.6">
              <animate attributeName="stopOpacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="hsl(262, 83%, 58%)" stopOpacity="0.8">
              <animate attributeName="stopOpacity" values="0.8;1;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="hsl(330, 81%, 60%)" stopOpacity="0.6">
              <animate attributeName="stopOpacity" values="0.6;1;0.6" dur="3s" begin="1s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* Animated paths between nodes */}
        {nodes.slice(0, -1).map((node, i) => {
          const nextNode = nodes[i + 1];
          const isActive = i <= activePath;
          
          return (
            <g key={i}>
              {/* Background path */}
              <path
                d={`M ${node.x} ${node.y} Q ${(node.x + nextNode.x) / 2} ${node.y - 50} ${nextNode.x} ${nextNode.y}`}
                stroke="hsl(var(--foreground) / 0.05)"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Animated path */}
              <path
                d={`M ${node.x} ${node.y} Q ${(node.x + nextNode.x) / 2} ${node.y - 50} ${nextNode.x} ${nextNode.y}`}
                stroke="url(#flow-gradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 5"
                opacity={isActive ? 1 : 0.2}
                className="transition-opacity duration-500"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-15"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Flowing particles */}
              {isActive && (
                <circle r="4" fill="hsl(217, 91%, 60%)">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M ${node.x} ${node.y} Q ${(node.x + nextNode.x) / 2} ${node.y - 50} ${nextNode.x} ${nextNode.y}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Interactive nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute cursor-pointer"
          style={{ 
            left: `${(node.x / viewBoxWidth) * 100}%`, 
            top: `${(node.y / viewBoxHeight) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onHoverStart={() => setActiveNode(i)}
          initial={{ scale: 0 }}
          animate={{ 
            scale: i <= activeNode ? 1 : 0.8,
            opacity: i <= activeNode ? 1 : 0.3
          }}
          transition={{ delay: i * 0.1, type: "spring" }}
        >
          {/* Node container */}
          <div className="relative">
            {/* Pulse effect */}
            {i === activeNode && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 to-purple-400/40 animate-ping opacity-20" />
            )}
            
            {/* Node box */}
            <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-background shadow-lg border-2 ${
              i <= activeNode ? 'border-primary' : 'border-border'
            } transition-all duration-500 hover:scale-110`}>
              <div className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${node.color} opacity-10`} />
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-xl sm:text-2xl">{node.icon}</span>
              </div>
            </div>
            
            {/* Label */}
            <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className={`text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
                i <= activeNode ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {node.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Progress indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {nodes.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i <= activeNode ? 'w-6 sm:w-8 bg-primary' : 'w-3 sm:w-4 bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveFlowDiagram;
