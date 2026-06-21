import Link from "next/link";
import Reveal from "./Reveal";
import Timeline from "./Timeline";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <div className="flex items-end justify-between">
        <div>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-muted">
              (03) — Experience
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
              The journey so far.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Link
            href="/experience"
            className="hidden text-sm text-accent transition-opacity hover:opacity-70 md:inline-block"
          >
            Full experience →
          </Link>
        </Reveal>
      </div>

      <div className="mt-16">
        <Timeline />
      </div>
    </section>
  );
}
