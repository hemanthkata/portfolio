"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TiltGlow from "./TiltGlow";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${project.slug}`} className="group block h-full">
        <TiltGlow className="relative h-full overflow-hidden rounded-2xl border border-line bg-bg p-8 transition-colors duration-300 group-hover:border-accent/50">
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-line px-3 py-1 text-xs text-accent">
              {project.tag}
            </span>
            <span className="text-2xl text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
              →
            </span>
          </div>
          <h3 className="mt-6 text-2xl font-bold tracking-tight">{project.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.desc}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((s) => (
              <span key={s} className="rounded-md bg-surface px-2.5 py-1 text-xs text-muted">
                {s}
              </span>
            ))}
          </div>
          <span className="mt-6 inline-block text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View case study →
          </span>
        </TiltGlow>
      </Link>
    </motion.div>
  );
}
