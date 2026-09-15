import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { education, experience } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

function Job({ job }) {
  return (
    <Reveal className="job" y={22}>
      <motion.span
        className="job__dot"
        aria-hidden="true"
        initial={{ scale: 0.4, backgroundColor: 'rgba(255,106,61,0)' }}
        whileInView={{ scale: 1, backgroundColor: 'rgba(255,106,61,1)' }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="job__top">
        <h4 className="job__role">{job.role}</h4>
        <span className="job__period">{job.period}</span>
      </div>

      <p className="job__company">{job.company}</p>

      <ul className="job__bullets">
        {job.bullets.map((bullet) => (
          <li key={bullet.slice(0, 28)}>{bullet}</li>
        ))}
      </ul>

      <div className="tags">
        {job.stack.map((item) => (
          <span className="tag" key={item}>
            {item}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const timelineRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="section section--line" id="experience">
      <div className="container">
        <SectionHeading num="03" title="Experience" note="Six roles, five years" />

        <div className="split">
          <div>
            <Reveal as="h3" className="mono subhead">
              Industry
            </Reveal>

            <div className="timeline" ref={timelineRef}>
              <span className="timeline__track" aria-hidden="true" />
              {/* the accent line fills in as this block scrolls past */}
              <motion.span
                className="timeline__fill"
                aria-hidden="true"
                style={reduced ? { scaleY: 1 } : { scaleY }}
              />

              {experience.map((job) => (
                <Job job={job} key={`${job.company}-${job.period}`} />
              ))}
            </div>
          </div>

          <div>
            <Reveal as="h3" className="mono subhead">
              Education
            </Reveal>

            <div className="edu">
              {education.map((row, i) => (
                <Reveal className="edu__row" key={row.degree} delay={i * 0.06} y={18}>
                  <span className="edu__degree">{row.degree}</span>
                  <span className="edu__score">{row.score}</span>
                  <span className="edu__org">{row.org}</span>
                  <span className="edu__year">{row.year}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
