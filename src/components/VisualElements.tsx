import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, viewportConfig, defaultTransition } from '@/lib/animations';

interface SectionDividerProps {
  symbol?: string;
  className?: string;
}

export const SectionDivider = ({ symbol = '●', className = '' }: SectionDividerProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`relative py-12 md:py-16 ${className}`}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-6 text-sm text-muted-foreground">
          {symbol}
        </span>
      </div>
    </motion.div>
  );
};

interface NumberedSectionProps {
  number: number;
  title: string;
  description: string;
  children?: ReactNode;
  delay?: number;
}

export const NumberedSection = ({ number, title, description, children, delay = 0 }: NumberedSectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeInUp}
      transition={{ ...defaultTransition, delay }}
      className="flex items-start gap-4 md:gap-6"
    >
      {/* Number badge */}
      <div className="flex-shrink-0 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
        <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm md:text-base shadow-lg">
          {number}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 pt-1">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </motion.div>
  );
};

interface GradientLineProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export const GradientLine = ({ className = '', direction = 'horizontal' }: GradientLineProps) => {
  const baseClasses = direction === 'horizontal' 
    ? 'h-px w-full bg-gradient-to-r' 
    : 'w-px h-full bg-gradient-to-b';
    
  return (
    <div className={`${baseClasses} from-transparent via-primary/30 to-transparent ${className}`} />
  );
};

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export const GlowCard = ({ children, className = '' }: GlowCardProps) => {
  return (
    <div className={`glow-on-hover relative ${className}`}>
      {children}
    </div>
  );
};

interface AccentBadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'gradient';
}

export const AccentBadge = ({ children, variant = 'gradient' }: AccentBadgeProps) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    gradient: 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${variants[variant]}`}>
      {children}
    </span>
  );
};
