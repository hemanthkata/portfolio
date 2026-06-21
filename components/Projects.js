import Link from "next/link";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "../lib/data";

export default function Projects() {
  return (
    <section id="work" className="border-t border-line bg-surface py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                (04) — Selected Work
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
                Featured projects.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/work"
              className="hidden text-sm text-accent transition-opacity hover:opacity-70 md:inline-block"
            >
              View all work →
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
