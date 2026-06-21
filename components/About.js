import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { stats } from "../lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-muted">(01) — About</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          I turn complex requirements into{" "}
          <span className="text-accent">clean, scalable systems</span> — from async
          APIs to full ERP deployments.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="bg-bg p-8">
              <CountUp
                value={s.value}
                className="text-4xl font-extrabold tracking-tight md:text-5xl"
              />
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
