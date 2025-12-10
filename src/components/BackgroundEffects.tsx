import { motion } from 'framer-motion';

export const MeshGradient = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-primary/5" />
    
    {/* Mesh gradient overlay */}
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(at 20% 80%, hsl(262 83% 58% / 0.08) 0px, transparent 50%),
          radial-gradient(at 80% 20%, hsl(217 91% 60% / 0.08) 0px, transparent 50%),
          radial-gradient(at 40% 40%, hsl(187 94% 43% / 0.05) 0px, transparent 50%)
        `,
      }}
    />
    
    {/* Dot pattern overlay */}
    <div className="absolute inset-0 dot-pattern-large opacity-30" />
  </div>
);

export const FloatingOrbs = () => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ duration: 2 }}
      className="absolute top-20 left-[10%] w-64 md:w-96 h-64 md:h-96 bg-primary/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.12 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="absolute top-40 right-[10%] w-64 md:w-80 h-64 md:h-80 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 2, delay: 1 }}
      className="absolute bottom-20 left-[20%] w-72 md:w-96 h-72 md:h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"
    />
  </>
);

export const GrainOverlay = () => (
  <div className="absolute inset-0 grain-texture pointer-events-none" />
);

export const DiagonalLines = () => (
  <div className="absolute inset-0 diagonal-lines pointer-events-none" />
);

interface SectionBackgroundProps {
  variant: 'mesh' | 'grain' | 'diagonal' | 'gradient';
}

export const SectionBackground = ({ variant }: SectionBackgroundProps) => {
  switch (variant) {
    case 'mesh':
      return (
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(at 0% 100%, hsl(217 91% 60% / 0.03) 0px, transparent 50%),
                radial-gradient(at 100% 0%, hsl(187 94% 43% / 0.03) 0px, transparent 50%)
              `,
            }}
          />
        </div>
      );
    case 'grain':
      return <GrainOverlay />;
    case 'diagonal':
      return <DiagonalLines />;
    case 'gradient':
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30" />
      );
    default:
      return null;
  }
};
