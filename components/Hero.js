"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "../lib/data";
import HeroBackground from "./HeroBackground";
import RotatingText from "./RotatingText";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // blob is the backdrop — transforms here are fine and don't affect text blending
  const blobOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section
      ref={ref}
      id="top"
      className="bg-grid relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28"
    >
      {/* three.js blob — painted below, z-0 */}
      <motion.div
        style={{ scale: blobScale, opacity: blobOpacity }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <HeroBackground variant={6} />
      </motion.div>

      {/* glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      {/* content wrapper — NO z-index / transform / opacity so blend can reach the blob */}
      <div className="relative mx-auto w-full max-w-6xl">
        {/* text group: inverts against whatever is behind it (blob or black) */}
        <div className="mix-blend-difference">
          <div className="rise-in mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span>Available for work</span>
            <span className="ml-auto hidden items-center gap-2 sm:flex">
              Focus:
              <RotatingText items={["FastAPI", "Odoo 17", "Spring Boot", "React", "AWS"]} />
            </span>
          </div>

          <h1 className="text-[13vw] font-extrabold uppercase leading-[0.85] tracking-tight md:text-[9vw]">
            <span className="rise-in block text-white">Full Stack</span>
            <span className="rise-in-2 block text-white">Developer</span>
          </h1>

          <p className="rise-in-3 mt-10 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">
            {profile.intro}
          </p>
        </div>

        {/* CTA — outside the blend group so it keeps its lime fill */}
        <div className="rise-in-3 mt-8">
          <a
            href="#work"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            View my work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-muted">
        <span className="inline-block animate-bounce">Scroll ↓</span>
      </div>
    </section>
  );
}
