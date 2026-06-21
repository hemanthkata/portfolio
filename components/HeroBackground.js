"use client";

import dynamic from "next/dynamic";

const HeroThree = dynamic(() => import("./HeroThree"), { ssr: false });

/* 4 — Aurora gradient */
function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/3 top-1/4 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[120px] animate-[auroraMove_14s_ease-in-out_infinite]" />
      <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/20 blur-[120px] animate-[auroraMove_18s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-0 left-1/2 h-[380px] w-[540px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[130px] animate-[auroraMove_16s_ease-in-out_infinite]" />
    </div>
  );
}

/* 5 — Synthwave perspective grid */
function GridFloor() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: "320px" }}>
      <div
        className="absolute bottom-0 left-1/2 h-[75%] w-[260%] -translate-x-1/2 animate-[gridMove_2.2s_linear_infinite]"
        style={{
          transform: "translateX(-50%) rotateX(72deg)",
          transformOrigin: "bottom center",
          backgroundImage:
            "linear-gradient(rgba(232,255,99,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(232,255,99,.35) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-bg/50 to-bg" />
    </div>
  );
}

/* 9 — Spinning color mesh */
function MeshSpin() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[760px] w-[760px] rounded-full opacity-40 blur-3xl animate-[spinSlow_20s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, #e8ff63, #7c5cff, #00e5ff, #ff5c8a, #e8ff63)",
        }}
      />
    </div>
  );
}

/* 10 — Minimal */
function Minimal() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]" />
    </div>
  );
}

export default function HeroBackground({ variant = 1 }) {
  if (variant === 4) return <Aurora />;
  if (variant === 5) return <GridFloor />;
  if (variant === 9) return <MeshSpin />;
  if (variant === 10) return <Minimal />;
  return <HeroThree variant={variant} />;
}
