import { motion } from 'framer-motion';

interface FlowingLinesProps {
  variant?: 'wave' | 'curve' | 'zigzag';
  className?: string;
  flip?: boolean;
}

export const FlowingLines = ({ variant = 'wave', className = '', flip = false }: FlowingLinesProps) => {
  const paths = {
    wave: "M 0,60 Q 200,20 400,50 T 800,40 T 1200,60 T 1600,45",
    curve: "M 0,80 Q 400,10 800,50 T 1600,30",
    zigzag: "M 0,50 L 200,30 L 400,60 L 600,25 L 800,55 L 1000,20 L 1200,50 L 1400,30 L 1600,45"
  };

  return (
    <div className={`relative h-24 md:h-32 -my-12 md:-my-16 z-10 overflow-hidden pointer-events-none ${className}`}>
      <motion.svg 
        className={`absolute inset-0 w-full h-full ${flip ? 'scale-y-[-1]' : ''}`}
        viewBox="0 0 1600 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <defs>
          <linearGradient id="flow-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="hsl(262, 83%, 58%)" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="hsl(187, 94%, 43%)" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="flow-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(187, 94%, 43%)" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Primary flowing line */}
        <path
          d={paths[variant]}
          stroke="url(#flow-gradient-1)"
          strokeWidth="2"
          fill="none"
          className="animate-flow"
        />
        
        {/* Secondary flowing line with offset */}
        <path
          d={paths[variant]}
          stroke="url(#flow-gradient-2)"
          strokeWidth="1.5"
          fill="none"
          className="animate-flow-reverse"
          transform="translate(0, 15)"
        />
        
        {/* Subtle third line */}
        <path
          d={paths[variant]}
          stroke="url(#flow-gradient-1)"
          strokeWidth="1"
          fill="none"
          className="animate-flow-slow"
          transform="translate(0, -10)"
          opacity="0.5"
        />
      </motion.svg>
    </div>
  );
};
