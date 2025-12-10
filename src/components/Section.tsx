import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, viewportConfig, defaultTransition } from '@/lib/animations';
import { SectionBackground, GrainOverlay } from '@/components/BackgroundEffects';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'subtle' | 'dots' | 'mesh' | 'diagonal';
  id?: string;
}

export const Section = ({ children, className = '', background = 'white', id }: SectionProps) => {
  const bgClasses = {
    white: 'bg-background',
    subtle: 'bg-secondary/30',
    dots: 'bg-background',
    mesh: 'bg-background',
    diagonal: 'bg-secondary/20'
  };

  return (
    <section id={id} className={`relative py-20 md:py-32 ${bgClasses[background]} ${className}`}>
      {/* Background effects */}
      {background === 'dots' && <div className="absolute inset-0 dot-pattern opacity-50" />}
      {background === 'mesh' && <SectionBackground variant="mesh" />}
      {background === 'diagonal' && <SectionBackground variant="diagonal" />}
      {background === 'white' && <GrainOverlay />}
      {background === 'subtle' && <SectionBackground variant="gradient" />}
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
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
