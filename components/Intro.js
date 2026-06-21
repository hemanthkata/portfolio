"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const Asteroid = dynamic(() => import("./Asteroid"), { ssr: false });

const COLS = 8;
const ROWS = 5;

export default function Intro() {
  // stages: asteroid -> break -> hk -> reveal -> done
  const [stage, setStage] = useState("asteroid");

  // shatter tiles, computed once
  const tiles = useMemo(() => {
    const arr = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const dx = c - (COLS - 1) / 2;
        const dy = r - 1.5;
        const dist = Math.hypot(dx, dy);
        arr.push({
          left: (c / COLS) * 100,
          top: (r / ROWS) * 100,
          delay: dist * 0.09,
          fx: dx * 180 + (Math.random() - 0.5) * 80,
          fy: 620 + dy * 80 + Math.random() * 220,
          rot: (Math.random() - 0.5) * 220,
        });
      }
    }
    return arr;
  }, []);

  useEffect(() => {
    // plays on every load — cinematic intro
    const timers = [
      setTimeout(() => setStage("break"), 3600), // asteroid impact
      setTimeout(() => setStage("hk"), 5600), // after the screen has shattered
      setTimeout(() => setStage("reveal"), 7600),
      setTimeout(() => setStage("done"), 8800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const skip = () => setStage("done");

  const shatter = stage !== "asteroid";

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* persistent black backdrop — fades to reveal the site */}
          <motion.div
            className="absolute inset-0 z-[1] bg-black"
            animate={{ opacity: stage === "reveal" ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* glass screen that shatters (with shake on impact) */}
          <motion.div
            className="absolute inset-0 z-[5]"
            animate={
              stage === "break"
                ? { x: [0, -16, 13, -9, 6, -3, 0], y: [0, 10, -7, 5, -3, 0] }
                : { x: 0, y: 0 }
            }
            transition={{ duration: 0.7 }}
          >
            {tiles.map((t, i) => (
              <motion.div
                key={i}
                className="absolute bg-black"
                style={{
                  left: `${t.left}%`,
                  top: `${t.top}%`,
                  width: `${100 / COLS}%`,
                  height: `${100 / ROWS}%`,
                  border: "0.5px solid rgba(255,255,255,0.06)",
                  boxShadow: "inset 0 0 2px rgba(255,255,255,0.05)",
                }}
                animate={
                  shatter
                    ? { opacity: 0, x: t.fx, y: t.fy, rotate: t.rot }
                    : { opacity: 1, x: 0, y: 0, rotate: 0 }
                }
                transition={shatter ? { duration: 1.8, delay: t.delay, ease: [0.4, 0, 0.6, 1] } : { duration: 0 }}
              />
            ))}
          </motion.div>

          {/* asteroid flying in */}
          <AnimatePresence>
            {stage === "asteroid" && (
              <motion.div
                className="absolute inset-0 z-[10]"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Asteroid />
              </motion.div>
            )}
          </AnimatePresence>

          {/* impact flash */}
          {stage === "break" && (
            <motion.div
              className="absolute inset-0 z-[20] bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              transition={{ duration: 0.8, times: [0, 0.15, 1] }}
            />
          )}

          {/* HK falling from the sky */}
          {(stage === "hk" || stage === "reveal") && (
            <motion.div
              className="absolute inset-0 z-[30] flex items-center justify-center"
              animate={{ opacity: stage === "reveal" ? 0 : 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ y: "-120vh", rotate: -8 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 11, mass: 1.1 }}
                className="select-none text-[26vw] font-extrabold leading-none tracking-tight text-white md:text-[20vw]"
              >
                HK<span className="text-accent">.</span>
              </motion.span>
            </motion.div>
          )}

          {/* skip */}
          {stage !== "reveal" && (
            <button
              onClick={skip}
              className="absolute bottom-6 right-6 z-[40] text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
            >
              Skip intro →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
