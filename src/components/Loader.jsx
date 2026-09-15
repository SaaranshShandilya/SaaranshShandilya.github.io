import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Short intro counter. Purely cosmetic — it runs on a timer rather than real
 * asset progress, and `onDone` hands control to the page when it finishes.
 */
export default function Loader({ onDone, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = null;
    let frame;

    const tick = (now) => {
      // seed from the rAF clock so t can never start out negative
      if (start === null) start = now;
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      // ease-out so the number sprints then settles
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 260);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, onDone]);

  return (
    <motion.div
      className="loader"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader__inner">
        <div className="loader__row">
          <span className="mono">Saaransh Shandilya</span>
          <span className="loader__count">{String(count).padStart(3, '0')}</span>
        </div>
        <div className="loader__track">
          <motion.div
            className="loader__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
