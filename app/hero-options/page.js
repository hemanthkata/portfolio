"use client";

import { useState } from "react";
import HeroBackground from "../../components/HeroBackground";
import { profile } from "../../lib/data";

const OPTIONS = [
  { n: 1, name: "Particle Wave" },
  { n: 2, name: "Wireframe Icosahedron" },
  { n: 3, name: "Wireframe Torus Knot" },
  { n: 4, name: "Aurora Gradient" },
  { n: 5, name: "Synthwave Grid" },
  { n: 6, name: "Starfield" },
  { n: 7, name: "Dark Glass Sphere" },
  { n: 8, name: "Floating Shapes" },
  { n: 9, name: "Color Mesh Spin" },
  { n: 10, name: "Minimal (no 3D)" },
];

export default function HeroOptions() {
  const [v, setV] = useState(1);

  return (
    <main>
      <section className="bg-grid relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-40 pt-28">
        {/* live background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <HeroBackground key={v} variant={v} />
        </div>

        {/* hero text (inverts for readability) */}
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mix-blend-difference">
            <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-white">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span>Option {v} — {OPTIONS[v - 1].name}</span>
            </div>
            <h1 className="text-[13vw] font-extrabold uppercase leading-[0.85] tracking-tight md:text-[9vw]">
              <span className="block text-white">Full Stack</span>
              <span className="block text-white">Developer</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">
              {profile.intro}
            </p>
          </div>
        </div>
      </section>

      {/* fixed selector */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/90 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-xs uppercase tracking-[0.25em] text-muted">
            Pick a hero background — tell me the number you want
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {OPTIONS.map((o) => (
              <button
                key={o.n}
                onClick={() => setV(o.n)}
                className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors md:text-sm ${
                  v === o.n
                    ? "border-accent bg-accent text-black"
                    : "border-line text-muted hover:border-white/30 hover:text-white"
                }`}
              >
                {o.n}. {o.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
