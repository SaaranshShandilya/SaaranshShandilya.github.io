import { profile } from '../data/content';

export default function Footer() {
  const socials = profile.socials.filter((s) => s.href);

  return (
    <footer className="footer">
      <div className="container footer__inner mono">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>

        {socials.length ? (
          <div className="footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        ) : null}

        <a className="footer__top" href="#top">
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
