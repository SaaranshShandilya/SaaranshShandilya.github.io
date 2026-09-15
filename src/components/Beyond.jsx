import SectionHeading from './ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import { achievements, positions } from '../data/content';

export default function Beyond() {
  return (
    <section className="section section--line" id="beyond">
      <div className="container">
        <SectionHeading num="05" title="Beyond the code" note="Awards & responsibility" />

        <RevealGroup className="awards" stagger={0.09}>
          {achievements.map((award) => (
            <RevealItem key={award.title}>
              <TiltCard className="award">
                <span className="award__star mono" aria-hidden="true">
                  ✦
                </span>
                <div>
                  <h3 className="award__title">{award.title}</h3>
                  <p className="mono award__meta">{award.meta}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="h3" className="mono subhead">
          Positions of responsibility
        </Reveal>

        {positions.map((pos) => (
          <Reveal className="pos" key={pos.title} y={20}>
            <div>
              <h4 className="pos__title">{pos.title}</h4>
              <p className="pos__org">
                {pos.org} · {pos.period}
              </p>
            </div>
            <p className="pos__detail">{pos.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
