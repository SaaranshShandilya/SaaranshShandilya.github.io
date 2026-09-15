import SectionHeading from './ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal';
import CountUp from './ui/CountUp';
import Portrait from './Portrait';
import { about } from '../data/content';

export default function About() {
  return (
    <section className="section section--line" id="about">
      <div className="container">
        <SectionHeading num="01" title="About" />

        <div className="about__grid">
          <div className="about__copy">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={p.slice(0, 24)} delay={i * 0.08}>
                {p}
              </Reveal>
            ))}

            <RevealGroup className="about__facts">
              {about.facts.map((fact) => (
                <RevealItem className="fact" key={fact.label}>
                  <div className="fact__value">
                    <CountUp value={fact.value} />
                  </div>
                  <div className="fact__label">{fact.label}</div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Portrait />
        </div>
      </div>
    </section>
  );
}
