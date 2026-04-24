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
      className="rounded-2xl p-6 md:p-8 text-center transition-all duration-300 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(15,23,42,0.12)] hover:shadow-[0_16px_48px_rgba(15,23,42,0.18)] hover:bg-white/15"
      style={{ WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 drop-shadow-sm">
        {displayValue}
      </div>
      <p className="text-foreground/80 font-medium">{label}</p>
    </motion.div>
  );
};
