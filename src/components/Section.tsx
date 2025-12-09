import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, viewportConfig, defaultTransition } from '@/lib/animations';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'subtle' | 'dots';
  id?: string;
}

export const Section = ({ children, className = '', background = 'white', id }: SectionProps) => {
  const bgClasses = {
    white: 'bg-background',
    subtle: 'bg-secondary/30',
    dots: 'bg-background dot-pattern'
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${bgClasses[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
}

export const SectionHeader = ({ title, subtitle, centered = true, gradient = false }: SectionHeaderProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeInUp}
      transition={defaultTransition}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${gradient ? 'gradient-text' : 'text-foreground'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
