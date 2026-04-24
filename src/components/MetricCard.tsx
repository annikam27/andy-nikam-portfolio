import { motion } from 'framer-motion';
import { useCounter } from '@/hooks/useCounter';
import { scaleIn, defaultTransition } from '@/lib/animations';
import { focusWeaveQuadrant } from './WeaveBackground';

interface MetricCardProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
  /** Which weave quadrant should illuminate on hover */
  quadrant?: 'tl' | 'tr' | 'bl' | 'br';
}

export const MetricCard = ({
  value,
  prefix = '',
  suffix = '',
  label,
  delay = 0,
  quadrant,
}: MetricCardProps) => {
  const { ref, displayValue } = useCounter({ end: value, prefix, suffix, duration: 2000 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={scaleIn}
      transition={{ ...defaultTransition, delay }}
      onMouseEnter={() => quadrant && focusWeaveQuadrant(quadrant)}
      onMouseLeave={() => quadrant && focusWeaveQuadrant(null)}
      className="rounded-2xl p-6 md:p-8 text-center transition-all duration-300 bg-white/10 border border-white/30 shadow-[0_8px_32px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)] hover:bg-white/15"
      style={{
        backdropFilter: 'blur(30px) saturate(140%)',
        WebkitBackdropFilter: 'blur(30px) saturate(140%)',
      }}
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_2px_8px_rgba(15,23,42,0.45)]">
        {displayValue}
      </div>
      <p className="text-white/95 font-medium drop-shadow-[0_1px_4px_rgba(15,23,42,0.4)]">
        {label}
      </p>
    </motion.div>
  );
};
