import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Cut-out portrait. The PNG has a transparent background, so it sits straight on
 * the page with a soft accent bloom behind it instead of a photo frame.
 */
export default function Portrait() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // drifts slightly slower than the page for a parallax feel
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const bloomScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.85]);

  return (
    <div className="portrait" ref={ref}>
      <motion.span
        className="portrait__bloom"
        aria-hidden="true"
        style={reduced ? undefined : { scale: bloomScale }}
      />

      <motion.div
        className="portrait__frame"
        initial={reduced ? false : { clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          className="portrait__img"
          src={profile.photo}
          alt={`${profile.name}, smiling with arms folded`}
          width="433"
          height="577"
          loading="lazy"
          decoding="async"
          style={reduced ? undefined : { y }}
        />
      </motion.div>

      <span className="portrait__tag mono" aria-hidden="true">
        {"Saaransh Shandilya"}
      </span>
    </div>
  );
}
