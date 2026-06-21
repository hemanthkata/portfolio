import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";
import CountUp from "../../components/CountUp";
import CTA from "../../components/CTA";
import { profile, stats, education, certifications, marqueeSkills } from "../../lib/data";

export const metadata = { title: "About — Hemanth Kata" };

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="(01) — About"
        title="About Me"
        subtitle="Full Stack Developer with 2+ years building production-grade web applications across Python, Java, and modern frontends."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            {profile.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-6 text-lg leading-relaxed text-muted">{para}</p>
              </Reveal>
            ))}
          </div>
          <div>
            <Reveal>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="text-sm uppercase tracking-widest text-muted">Details</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex justify-between gap-4">
                    <span className="text-muted">Location</span>
                    <span>{profile.location}</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="text-muted">Role</span>
                    <span>{profile.role}</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="text-muted">Email</span>
                    <a href={`mailto:${profile.email}`} className="text-accent">Email me</a>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="text-muted">GitHub</span>
                    <a href={profile.github} className="text-accent">@hemanthkata</a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* stats */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="bg-bg p-8">
                <CountUp value={s.value} className="text-4xl font-extrabold tracking-tight md:text-5xl" />
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* education */}
        <div className="mt-20">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Education</h2>
          </Reveal>
          <div className="mt-8 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {education.map((e, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex flex-col gap-1 bg-bg p-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-lg font-semibold">{e.degree}</div>
                    <div className="text-sm text-muted">{e.school}</div>
                  </div>
                  <div className="text-sm text-muted">{e.period}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* skills */}
        <div className="mt-20">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Skills & Tools</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-wrap gap-3">
              {marqueeSkills.map((s) => (
                <span key={s} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* certifications */}
        <div className="mt-20">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Certifications</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-wrap gap-3">
              {certifications.map((c) => (
                <span key={c} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </main>
  );
}
