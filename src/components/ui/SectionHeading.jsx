import Reveal from './Reveal';
import TextReveal from './TextReveal';

export default function SectionHeading({ num, title, note }) {
  return (
    <Reveal className="head" y={18}>
      <span className="mono head__num">{num}</span>
      <TextReveal as="h2" className="head__title" text={title} stagger={0.05} />
      {note ? <span className="mono head__note">{note}</span> : null}
    </Reveal>
  );
}

export function ArrowIcon({ size = 12 }) {
  return (
    <svg
      className="btn__arrow"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
