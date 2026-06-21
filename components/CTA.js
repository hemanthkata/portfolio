import Reveal from "./Reveal";
import { profile } from "../lib/data";

const connect = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: profile.phone, href: `tel:${profile.phone}` },
];

export default function CTA() {
  return (
    <section className="bg-grid relative overflow-hidden py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]" />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-muted">
            Let&apos;s connect
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-8xl">
            Let&apos;s build<br />something.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-md text-muted">
            Open to full-time roles and freelance projects. My inbox is always open.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Write to me →
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
            {connect.map((c) => (
              <a key={c.label} href={c.href} className="transition-colors hover:text-white">
                {c.label} ↗
              </a>
            ))}
            <span>{profile.location}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
