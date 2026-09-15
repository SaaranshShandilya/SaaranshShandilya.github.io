import SectionHeading, { ArrowIcon } from './ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal';
import Magnetic from './ui/Magnetic';
import { projects, shipped } from '../data/content';

function Project({ project }) {
  const links = project.links.filter((link) => link.href);

  return (
    <Reveal className="project" style={{ '--p-accent': project.accent }} y={34}>
      <div className="project__glow" aria-hidden="true" />

      <div className="mono project__index">{project.index}</div>

      <div className="project__head">
        <span className="mono project__kind">{project.kind}</span>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__meta">
          {project.supervisor ? `${project.supervisor} · ` : ''}
          {project.year}
        </p>
      </div>

      <div className="project__body">
        <p className="project__summary">{project.summary}</p>

        <ul className="project__bullets">
          {project.bullets.map((bullet) => (
            <li key={bullet.slice(0, 28)}>{bullet}</li>
          ))}
        </ul>

        <div className="tags">
          {project.stack.map((item) => (
            <span className="tag" key={item}>
              {item}
            </span>
          ))}
        </div>

        {links.length ? (
          <div className="project__links">
            {links.map((link) => (
              <Magnetic key={link.label}>
                <a className="btn btn--sm" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ArrowIcon />
                </a>
              </Magnetic>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function ShippedCard({ item }) {
  return (
    <RevealItem>
      <a className="ship" href={item.href} target="_blank" rel="noreferrer">
        <span className="ship__sweep" aria-hidden="true" />

        <span className="ship__top">
          <span className="mono ship__kind">{item.kind}</span>
          <ArrowIcon size={13} />
        </span>

        <span className="ship__name">{item.name}</span>
        <span className="ship__blurb">{item.blurb}</span>

        <span className="tags ship__tags">
          {item.stack.map((tech) => (
            <span className="tag" key={tech}>
              {tech}
            </span>
          ))}
        </span>
      </a>
    </RevealItem>
  );
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHeading num="02" title="Selected work" note="Thesis & projects" />

        <div className="work__list">
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>

        <Reveal as="h3" className="mono subhead work__also">
          Also shipped
        </Reveal>

        <RevealGroup className="ships" stagger={0.07}>
          {shipped.map((item) => (
            <ShippedCard item={item} key={item.name} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
