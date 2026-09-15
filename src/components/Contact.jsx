import TextReveal from './ui/TextReveal';
import Reveal from './ui/Reveal';
import { profile } from '../data/content';

export default function Contact() {
  const socials = profile.socials.filter((s) => s.href);

  return (
    <section className="contact" id="contact">
      <div className="container">
        <Reveal as="p" className="mono contact__label" y={14}>
          (06) — Contact
        </Reveal>

        <TextReveal
          as="h2"
          className="display contact__title"
          text="Let's build something."
          stagger={0.06}
        />

        <Reveal y={20} delay={0.1}>
          <a className="contact__mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </Reveal>

        <Reveal className="contact__meta mono" y={20} delay={0.18}>
          <span className="contact__meta-item">
            <span>Phone</span>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          </span>

          <span className="contact__meta-item">
            <span>Based in</span>
            <span>{profile.location}</span>
          </span>

          {socials.length ? (
            <span className="contact__meta-item">
              <span>Elsewhere</span>
              <span style={{ display: 'flex', gap: '1rem' }}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </span>
            </span>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
