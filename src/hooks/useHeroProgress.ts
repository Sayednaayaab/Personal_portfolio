import { useScroll, useTransform, motionValue } from 'framer-motion';

export function useHeroProgress() {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return progress;
}

