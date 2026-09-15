import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Animates the numeric part of a string when it scrolls into view, leaving any
 * prefix/suffix alone — "270M" counts to 270 and keeps the M, "9.17" keeps its
 * two decimals. Anything with no digits is rendered as-is.
 */
const PATTERN = /^(\D*)(\d+(?:\.\d+)?)(.*)$/s;

export default function CountUp({ value, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(null);

  // memoised so the effect below depends on primitives only — a fresh match
  // array each render would restart the animation on every frame it schedules
  const parsed = useMemo(() => {
    const m = PATTERN.exec(String(value));
    if (!m) return null;
    return {
      prefix: m[1],
      number: m[2],
      suffix: m[3],
      target: Number(m[2]),
      decimals: (m[2].split('.')[1] ?? '').length,
    };
  }, [value]);

  const target = parsed?.target;
  const decimals = parsed?.decimals;

  useEffect(() => {
    if (target === undefined || reduced || !inView) return undefined;

    let frame;
    let start = null;

    const tick = (now) => {
      // seed from the rAF clock: its timestamp is the start of the frame and can
      // predate a performance.now() taken here, which would give a negative t
      if (start === null) start = now;
      const t = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((target * eased).toFixed(decimals));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, duration, target, decimals]);

  if (!parsed) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {parsed.prefix}
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        {display === null || reduced ? parsed.number : display}
      </span>
      {parsed.suffix}
    </span>
  );
}
