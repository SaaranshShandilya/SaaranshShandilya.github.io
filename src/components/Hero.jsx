import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// three.js is the heaviest thing on the page — keep it out of the first paint
const HeroScene = lazy(() => import('./three/HeroScene'));
import Magnetic from './ui/Magnetic';
import { ArrowIcon } from './ui/SectionHeading';
import { profile } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const rise = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 1.1, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ ready }) {
  const sectionRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  // plain ref the WebGL frame loop can read without re-rendering React
  const scrollProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => scrollYProgress.on('change', (v) => {
    scrollProgress.current = v;
  }), [scrollYProgress]);

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section className="hero" ref={sectionRef} id="top">
      <div className="hero__canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene scrollRef={scrollProgress} />
        </Suspense>
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <motion.div
        className="hero__inner container"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="hero__eyebrow mono"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="hero__dot" />
          <span>{profile.role}</span>
          <span aria-hidden="true">/</span>
          <span>{profile.place}</span>
        </motion.div>

        <h1 className="display hero__title">
          <span className="sr-only">
            {profile.first} {profile.last}
          </span>
          {[profile.first, profile.last].map((line, i) => (
            <span className="hero__title-line" key={line} aria-hidden="true">
              <motion.span
                custom={i}
                variants={rise}
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
              >
                {i === 1 ? <em>{line}</em> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="hero__grid"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="lede hero__blurb">{profile.blurb}</p>

          <div>
            <div className="hero__actions">
              <Magnetic>
                <a className="btn" href="#work">
                  Selected work
                  <ArrowIcon />
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn" href="#contact">
                  Get in touch
                  <ArrowIcon />
                </a>
              </Magnetic>
            </div>

            <div className="hero__scroll mono">
              <span className="hero__scroll-line" aria-hidden="true" />
              <span>Scroll</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
