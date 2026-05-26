import { type ReactNode } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function Card({ children, className, onClick, selected }: CardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        'p-4 rounded-xl border-2 transition-all cursor-pointer bg-white',
        selected
          ? 'border-brand bg-brand/5 shadow-sm'
          : 'border-slate-100 hover:border-brand/30 hover:shadow-sm',
        !onClick && 'cursor-default pointer-events-none hover:border-slate-100 hover:shadow-none',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
