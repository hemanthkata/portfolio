import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../../components/PageHeader";
import Reveal from "../../../components/Reveal";
import CTA from "../../../components/CTA";
import { allProjects, getProject, getProjectDetails } from "../../../lib/data";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  return { title: p ? `${p.name} — Hemanth Kata` : "Project" };
}

export default function ProjectDetail({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const details = getProjectDetails(params.slug);
  const more = allProjects.filter((p) => p.slug !== params.slug).slice(0, 3);

  return (
    <main>
      <PageHeader eyebrow={project.tag} title={project.name} subtitle={project.overview} />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <Link href="/work" className="text-sm text-muted transition-colors hover:text-white">
            ← All work
          </Link>
        </Reveal>

        {/* meta row */}
        <Reveal delay={0.05}>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-bg p-5">
              <div className="text-xs uppercase tracking-widest text-muted">Year</div>
              <div className="mt-1 font-semibold">{project.year}</div>
            </div>
            <div className="bg-bg p-5">
              <div className="text-xs uppercase tracking-widest text-muted">Role</div>
              <div className="mt-1 font-semibold">{project.role}</div>
            </div>
            <div className="bg-bg p-5">
              <div className="text-xs uppercase tracking-widest text-muted">Status</div>
              <div className="mt-1 font-semibold text-accent">{project.tag}</div>
            </div>
          </div>
        </Reveal>

        {/* metrics */}
        {project.metrics && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            {project.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-line bg-surface p-5 text-center">
                  <div className="text-xl font-extrabold tracking-tight md:text-2xl">{m.value}</div>
                  <div className="mt-1 text-xs text-muted">{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* challenge */}
        {details?.challenge && (
          <div className="mt-14">
            <Reveal>
              <h2 className="text-sm uppercase tracking-[0.25em] text-muted">The Challenge</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 border-l-2 border-accent pl-6 text-xl leading-relaxed text-white/90">
                {details.challenge}
              </p>
            </Reveal>
          </div>
        )}

        {/* approach */}
        {details?.approach && (
          <div className="mt-14">
            <Reveal>
              <h2 className="text-sm uppercase tracking-[0.25em] text-muted">
                Approach &amp; Architecture
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {details.approach.map((step, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex gap-5 rounded-2xl border border-line bg-surface p-5">
                    <span className="font-mono text-sm text-accent">0{i + 1}</span>
                    <span className="text-muted">{step}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* impact */}
        {details?.impact && (
          <div className="mt-14">
            <Reveal>
              <h2 className="text-sm uppercase tracking-[0.25em] text-muted">Impact &amp; Outcome</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/5 p-6 text-lg leading-relaxed text-white/90">
                {details.impact}
              </div>
            </Reveal>
          </div>
        )}

        {/* features */}
        <div className="mt-14">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.25em] text-muted">
              Key Features & Highlights
            </h2>
          </Reveal>
          <ul className="mt-6 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {project.features.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="flex items-start gap-4 bg-bg p-5">
                  <span className="mt-1 text-accent">→</span>
                  <span className="text-muted">{f}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* stack */}
        <div className="mt-14">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.25em] text-muted">Tech Stack</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.stack.map((t) => (
                <span key={t} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        {/* more projects */}
        <div className="mt-20 border-t border-line pt-12">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.25em] text-muted">Explore more work</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group block h-full rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/50"
                >
                  <span className="text-xs text-accent">{p.tag}</span>
                  <div className="mt-2 font-semibold leading-snug">{p.name}</div>
                  <span className="mt-3 inline-block text-sm text-muted transition-colors group-hover:text-accent">
                    View →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
