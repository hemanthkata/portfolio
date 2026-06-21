import PageHeader from "../../components/PageHeader";
import ProjectCard from "../../components/ProjectCard";
import Reveal from "../../components/Reveal";
import CTA from "../../components/CTA";
import { projects, mlProjects } from "../../lib/data";

export const metadata = { title: "Work — Hemanth Kata" };

export default function WorkPage() {
  return (
    <main>
      <PageHeader
        eyebrow="(04) — Selected Work"
        title="My Work"
        subtitle="Production systems, custom ERP modules, and 10 large-scale machine-learning projects. Click any project to read the full case study."
      />

      {/* professional / full-stack work */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-12">
        <Reveal>
          <h2 className="text-sm uppercase tracking-[0.25em] text-muted">
            Full-Stack &amp; ERP
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* machine learning projects */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-accent">
            10 Projects
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Machine Learning.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-muted">
            Large-scale ML systems spanning computer vision, NLP/LLMs, generative AI,
            recommender systems, forecasting, and real-time anomaly detection.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mlProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <CTA />
    </main>
  );
}
