import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, profile } from '../data/content';
import Magnetic from './ui/Magnetic';
import { ArrowIcon } from './ui/SectionHeading';

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock the page behind the full-screen menu, and let Escape close it
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav${stuck ? ' nav--stuck' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container nav__inner">
          <a className="nav__brand" href="#top" aria-label="Back to top">
            <span className="nav__mark" />
            {profile.name}
          </a>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} className="nav__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* plain wrapper so the breakpoint can hide it — Magnetic sets its own
              inline display, which would win over a class-based rule */}
          <div className="nav__cta">
            <Magnetic>
              <a className="btn btn--sm" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                Résumé
                <ArrowIcon />
              </a>
            </Magnetic>
          </div>

          <button
            className="burger"
            data-open={open}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                className="menu__link"
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </motion.a>
            ))}

            <motion.div
              className="menu__foot mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {profile.socials
                .filter((s) => s.href)
                .map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                Résumé
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
