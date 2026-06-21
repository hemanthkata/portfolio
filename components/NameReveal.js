"use client";

import { motion } from "framer-motion";

function Trailing({ text, base }) {
  return text.split("").map((l, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: base + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {l}
    </motion.span>
  ));
}

// stage 0: "HK."  ->  stage 1: "H   K" (split apart)  ->  stage 2: "Hemanth Kata"
export default function NameReveal({ stage = 0 }) {
  const ease = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
  return (
    <motion.div
      layout
      className="flex items-end justify-center text-6xl font-extrabold leading-none tracking-tight md:text-8xl"
    >
      <motion.span layout transition={ease}>
        H
      </motion.span>
      {stage >= 2 && <Trailing text="emanth" base={0.05} />}

      {stage >= 1 && (
        <motion.span
          layout
          transition={ease}
          className="inline-block"
          style={{ width: stage >= 2 ? "0.32em" : "0.7em" }}
        />
      )}

      <motion.span layout transition={ease}>
        K
      </motion.span>
      {stage >= 2 && <Trailing text="ata" base={0.05 + 6 * 0.05} />}

      {stage === 0 && <span className="text-accent">.</span>}
    </motion.div>
  );
}
