import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { fadeInUp, slideFromLeft, slideFromRight, viewportConfig, defaultTransition } from '@/lib/animations';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  visual?: React.ReactNode;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, visual, direction = 'up', delay = 0 }: FeatureCardProps) => {
  const variants = {
    left: slideFromLeft,
    right: slideFromRight,
    up: fadeInUp
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={variants[direction]}
      transition={{ ...defaultTransition, delay }}
      className="group bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      {visual && (
        <div className="mt-4 pt-4 border-t border-border">
          {visual}
        </div>
      )}
    </motion.div>
  );
};
