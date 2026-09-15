import { motion } from 'framer-motion';
import { marqueeWords } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/** Two identical tracks sliding left; the second covers the seam as the first exits. */
export default function Marquee({ speed = 32 }) {
  const reduced = usePrefersReducedMotion();

  const track = (
    <div className="marquee__track">
      {marqueeWords.map((word, i) => (
        <span className="marquee__item" key={`${word}-${i}`}>
          {word}
        </span>
      ))}
    </div>
  );

  if (reduced) {
    return (
      <div className="marquee" aria-hidden="true">
        {track}
      </div>
    );
  }

  return (
    <div className="marquee" aria-hidden="true">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          style={{ display: 'flex', flexShrink: 0 }}
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        >
          {track}
        </motion.div>
      ))}
    </div>
  );
}
