import { motion } from 'framer-motion';
import { useCounter } from '@/hooks/useCounter';
import { scaleIn, defaultTransition } from '@/lib/animations';

interface MetricCardProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
}

export const MetricCard = ({ value, prefix = '', suffix = '', label, delay = 0 }: MetricCardProps) => {
  const { ref, displayValue } = useCounter({ end: value, prefix, suffix, duration: 2000 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={scaleIn}
      transition={{ ...defaultTransition, delay }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center shadow-card hover:shadow-elevated transition-shadow duration-300"
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
        {displayValue}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
};
