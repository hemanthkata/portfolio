import Reveal from "./Reveal";
import { resumes } from "../lib/data";

export default function ResumeDownload() {
  return (
    <section className="border-t border-line bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-muted">Resume</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Download my resume.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-muted">
            Three role-focused versions — pick whichever fits the position best.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {resumes.map((r, i) => (
            <Reveal key={r.file} delay={i * 0.08}>
              <a
                href={r.file}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-line bg-bg p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">📄</span>
                  <span className="text-2xl text-muted transition-transform duration-300 group-hover:translate-y-1 group-hover:text-accent">
                    ↓
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{r.label}</h3>
                <p className="mt-2 text-sm text-muted">{r.desc}</p>
                <span className="mt-6 inline-block text-sm font-medium text-accent">
                  Download PDF →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
