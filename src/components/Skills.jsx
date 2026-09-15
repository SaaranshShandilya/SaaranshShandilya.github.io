import SectionHeading from './ui/SectionHeading';
import { RevealGroup, RevealItem } from './ui/Reveal';
import { skills } from '../data/content';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading num="04" title="Toolkit" note="Day to day" />

        <RevealGroup className="skills__grid" stagger={0.07}>
          {skills.map((group) => (
            <RevealItem className="skillcard" key={group.group}>
              <h3 className="mono skillcard__title">{group.group}</h3>
              <ul className="skillcard__items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
