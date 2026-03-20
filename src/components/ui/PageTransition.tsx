import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page transition wrapper for smooth route changes
 * Provides consistent fade and slide animations
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -30 }}
      transition={{ 
        duration: 0.5,
        ease: [0.34, 0.16, 0.22, 0.98] 
      }}
      className="overflow-hidden"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
