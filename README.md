# Saaransh Shandilya — Portfolio

Personal portfolio built with **React + Vite**, **Three.js** (via react-three-fiber, with
hand-written GLSL) and **Framer Motion**, plus Lenis for inertial scrolling.

## Run it

```bash
npm install     # .npmrc pins legacy-peer-deps (see "Dependency note")
npm run dev     # http://localhost:5173
npm run build   # → dist/
npm run preview # serve the production build
npm run lint
```

## One thing left to add

Everything the site says lives in **`src/data/content.js`**. Every project, product and
social link is wired up and returns 200. The one outstanding item:

**The résumé PDF.** `profile.resumeUrl` points at `/Saaransh_Shandilya_Resume.pdf`.
Drop the actual PDF into `public/` under that name (or change the path) — until then the
Résumé button 404s.

Two notes on links:

- VayuBuddy's live tool is `http://34.14.147.52:8507/` — plain HTTP on a bare IP. It works,
  but browsers will flag it as insecure; swap it for a domain when there is one.
- A link with an empty `href` is simply not rendered, so a project can be listed before its
  URL exists.

The portrait at `public/saaransh.png` is a transparent cut-out, so it sits straight on the
dark background with a gradient bloom behind it instead of a photo frame — swap the file and
the About section picks it up.

## Structure

```
src/
  data/content.js          all copy, in one file — edit here, not in components
  styles/global.css        design tokens + every rule, grouped by section
  hooks/
    usePrefersReducedMotion.js
    useSmoothScroll.js     Lenis + eased anchor jumps
  components/
    three/
      HeroScene.jsx        r3f canvas: particle cloud + wireframe core
      shaders.js           GLSL (simplex noise, particle + core programs)
    ui/                    Reveal, TextReveal, Magnetic, SectionHeading,
                           ScrollProgress, CountUp, TiltCard
    Portrait.jsx           cut-out photo with bloom + scroll parallax
    Loader, Cursor, Nav, Hero, Marquee, About, Work,
    Experience, Skills, Beyond, Contact, Footer
```

## Palette

Ember orange (`--accent`), amber (`--accent-soft`) and ice blue (`--cool`) on near-black.
All three are defined once as custom properties at the top of `global.css`; the hero shader
takes its two particle colours and the core colour from the same hexes in `HeroScene.jsx`,
so a palette change is those two files.

## Motion inventory

- Intro counter, then a masked word-by-word rise on every section heading.
- Hero: GLSL particle cloud reacting to cursor and scroll, plus camera parallax.
- Scroll progress hairline across the top of the viewport.
- About: stat numbers count up on entry; portrait wipes in behind a clip-path and drifts
  on scroll while its bloom breathes.
- Experience: the timeline rail fills with scroll progress and each role’s dot pops in.
- Work: accent underline sweeps under a project title on hover.
- Beyond: award cards tilt in 3D toward the cursor with a pointer-tracking highlight.
- Work: the "Also shipped" cards wash with an accent gradient rising from the bottom edge.
- Magnetic buttons, custom cursor, running marquee, full-screen mobile menu.

## How the hero works

7,000 points are laid out on a Fibonacci-lattice sphere and displaced in the vertex shader
by animated 3D simplex noise. The pointer is projected into world space and pushes points
away from it; scroll progress is fed in as a uniform so the cloud contracts and fades as you
leave the hero. Point size is multiplied by the device pixel ratio so it stays visually
constant on retina displays.

Scroll progress reaches the WebGL frame loop through a plain `useRef`, not React state —
the render loop reads `.current` every frame without triggering a single re-render.

## Performance and accessibility

- Three.js is `React.lazy`-loaded, so it is a separate chunk (~240 kB gzip) and the initial
  bundle is ~127 kB gzip.
- Particle count drops to 3,500 below 760px; DPR is capped at 1.75.
- `prefers-reduced-motion: reduce` is honoured throughout: the intro loader is skipped,
  Lenis is not started, the custom cursor and magnetic buttons are disabled, reveals render
  as plain elements, and the WebGL frameloop switches to `demand`.
- Headings animate word-by-word behind an `overflow:hidden` mask, but the in-view observer
  is attached to the *heading*, never to the translated words — a word offset by
  `translateY(110%)` is clipped out of its mask, and IntersectionObserver honours ancestor
  clipping, so observing the word itself would deadlock and it would never appear.
- Full keyboard support: skip link, visible focus rings, Escape closes the mobile menu.
- Watch out when an element is both positioned by a CSS `transform` and animated by Framer
  Motion: FM writes `transform` and silently replaces yours. The portrait bloom is centred
  with `inset` + `margin-inline: auto` + the standalone `translate` property for that reason.
- `body` has `overflow-x: clip`, but that value propagates to the viewport, which means the
  body element itself stops clipping. Decorative elements have to stay inside their own
  column, and note that Chrome counts filter ink-overflow as scrollable overflow too.

## Dependency note

`@react-three/fiber` declares optional peers on Expo/React Native. npm tries to resolve them
and fails against React 19, so `.npmrc` sets `legacy-peer-deps=true`. `netlify.toml` passes
the same flag via `NPM_FLAGS` for CI builds.

## Deploying

`netlify.toml` is set up for Netlify (build `npm run build`, publish `dist`, SPA redirect).
Any static host works — build and serve `dist/`.
