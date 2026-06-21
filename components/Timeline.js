"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { experience } from "../lib/data";

function TimelineItem({ job, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-16 md:pl-24"
    >
      {/* node */}
      <div className="absolute left-[9px] top-2 md:left-[25px]">
        <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-accent/40" />
        <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-bg">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      </div>

      {/* big index */}
      <div className="absolute left-0 top-0 hidden text-xs font-bold text-muted md:block">
        0{index + 1}
      </div>

      {/* card */}
      <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:border-accent/50 hover:bg-bg">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-sm text-accent">{job.period}</span>
          <span className="text-xs uppercase tracking-widest text-muted">{job.location}</span>
        </div>

        <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
          {job.role}
        </h3>
        <div className="mt-1 text-lg text-muted">
          <span className="text-white">@ {job.company}</span>
        </div>

        <ul className="mt-6 space-y-3">
          {job.points.map((p, j) => (
            <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-1.5 text-accent">▹</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {job.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-line bg-bg px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-accent/30"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative">
      {/* base spine */}
      <div className="absolute left-4 top-0 h-full w-px bg-line md:left-[33px]" />
      {/* animated fill */}
      <motion.div
        style={{ scaleY: fill }}
        className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent to-accent/30 md:left-[33px]"
      />

      <div className="space-y-10">
        {experience.map((job, i) => (
          <TimelineItem key={i} job={job} index={i} />
        ))}
      </div>
    </div>
  );
}
