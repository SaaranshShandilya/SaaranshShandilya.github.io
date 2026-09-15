import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Work from './components/Work';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Beyond from './components/Beyond';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';

import { useSmoothScroll } from './hooks/useSmoothScroll';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [loading, setLoading] = useState(!reduced);

  useSmoothScroll(!loading);

  // hold the page at the top while the intro plays
  useEffect(() => {
    if (!loading) return undefined;
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />

      <AnimatePresence>
        {loading ? <Loader key="loader" onDone={finishLoading} /> : null}
      </AnimatePresence>

      <a className="skip-link" href="#work">
        Skip to content
      </a>

      <Nav />

      <main className="shell">
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Beyond />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
