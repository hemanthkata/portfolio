"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-grid relative overflow-hidden px-6 pb-16 pt-40">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <ParticleField />
      </div>
      <div className="pointer-events-none absolute -top-20 left-1/2 z-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] text-muted"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-8xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
