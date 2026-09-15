import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const maskStyle = {
  display: 'inline-block',
  overflow: 'hidden',
  verticalAlign: 'bottom',
};

/**
 * Masked word-by-word rise: each word slides up from behind the line above it.
 *
 * The in-view trigger lives on the heading itself rather than on the words.
 * A word starts at translateY(110%), which puts it fully outside its
 * overflow:hidden mask — and IntersectionObserver honours ancestor clipping, so
 * a word can never report itself as visible. Observing the untransformed parent
 * and driving the words with variants avoids that deadlock.
 */
export default function TextReveal({
  text,
  className,
  as = 'span',
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
}) {
  const reduced = usePrefersReducedMotion();
  const words = String(text).split(' ');
  const Tag = motion[as] ?? motion.span;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        // the mask is a motion component purely so variants reach the word inside it
        <motion.span key={`${word}-${i}`} aria-hidden="true" style={maskStyle}>
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
