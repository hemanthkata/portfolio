"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";
import NameReveal from "./NameReveal";

/* ---------- timeline (seconds) ---------- */
const T = {
  reveal: 2.0,   // stars + vortex fade in
  spiral: 3.5,   // vortex starts accelerating inward
  freeze: 8.0,   // singularity explodes
  assemble: 10.5, // particles form HK
  lift: 11.7,    // HK particles move up
  expand: 13.6,  // particles extend into "Hemanth Kata"
};

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- sample "HK" into 3D target points ---------- */
function sampleTextTargets(text, count, worldW) {
  const fontPx = 200;
  const pad = 24;
  const c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  ctx.font = `bold ${fontPx}px Arial, sans-serif`;
  const tw = Math.ceil(ctx.measureText(text).width);
  const W = tw + pad * 2;
  const H = fontPx + pad * 2;
  c.width = W;
  c.height = H;
  ctx = c.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${fontPx}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W / 2, H / 2);
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts = [];
  for (let y = 0; y < H; y += 2)
    for (let x = 0; x < W; x += 2)
      if (data[(y * W + x) * 4] > 128) pts.push([x, y]);
  const scale = worldW / W;
  const targets = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = pts.length ? pts[(Math.random() * pts.length) | 0] : [W / 2, H / 2];
    targets[i * 3]     = (p[0] - W / 2) * scale;
    targets[i * 3 + 1] = -(p[1] - H / 2) * scale;
    targets[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
  }
  return targets;
}

/* ---------- galaxy vortex → singularity → HK sequence ---------- */
function Sequence() {
  const { camera } = useThree();
  const t0 = useRef(null);

  const starsMat  = useRef();
  const vortexRef = useRef();
  const vortexMat = useRef();
  const coreRef   = useRef();
  const coreMat   = useRef();
  const coreLight = useRef();
  const points    = useRef();
  const exploded  = useRef(false);

  /* per-particle mutable state stored in refs */
  const vAngles = useRef(null);
  const vRadii0 = useRef(null); // initial radii (never changes)
  const vSpeeds = useRef(null);
  const vYs0    = useRef(null); // initial y (never changes)

  const N = 5000; // HK particles
  const V = 3500; // vortex particles

  /* HK particle geometry */
  const { positions, origins, dirs, hkTargets } = useMemo(() => {
    const hkTargets = sampleTextTargets("HK", N, 3.6);
    const positions = new Float32Array(N * 3);
    const origins   = new Float32Array(N * 3);
    const dirs      = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const dv = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      dirs[i*3]=dv.x; dirs[i*3+1]=dv.y; dirs[i*3+2]=dv.z;
      origins[i*3]=dv.x*0.4; origins[i*3+1]=dv.y*0.4; origins[i*3+2]=dv.z*0.4;
      positions[i*3]=origins[i*3]; positions[i*3+1]=origins[i*3+1]; positions[i*3+2]=origins[i*3+2];
    }
    return { positions, origins, dirs, hkTargets };
  }, []);

  /* Galaxy vortex initial layout — disk with arm-like density */
  const vortexInitPos = useMemo(() => {
    const angles = new Float32Array(V);
    const radii  = new Float32Array(V);
    const speeds = new Float32Array(V);
    const ys     = new Float32Array(V);
    const pos    = new Float32Array(V * 3);
    for (let i = 0; i < V; i++) {
      const r     = 1.2 + Math.pow(Math.random(), 0.6) * 7.0;
      const angle = Math.random() * Math.PI * 2;
      /* slight spiral-arm offset so it looks like a galaxy */
      const armOffset = (r / 8) * 1.2;
      const a = angle + armOffset;
      const y = (Math.random() - 0.5) * 1.0 * (1 - r / 9);
      angles[i] = a;
      radii[i]  = r;
      speeds[i] = (0.15 + Math.random() * 0.35) / Math.sqrt(r); // Keplerian-ish
      ys[i]     = y;
      pos[i*3]   = Math.cos(a) * r;
      pos[i*3+1] = y;
      pos[i*3+2] = Math.sin(a) * r;
    }
    vAngles.current = angles;
    vRadii0.current = radii;
    vSpeeds.current = speeds;
    vYs0.current    = ys;
    return pos;
  }, []);

  /* Star field */
  const starPositions = useMemo(() => {
    const M = 2000;
    const a = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) {
      a[i*3]   = (Math.random() - 0.5) * 80;
      a[i*3+1] = (Math.random() - 0.5) * 80;
      a[i*3+2] = -15 - Math.random() * 50;
    }
    return a;
  }, []);

  useFrame((state, delta) => {
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const t  = state.clock.elapsedTime - t0.current;
    const et = state.clock.elapsedTime;

    /* stars fade in */
    if (starsMat.current) starsMat.current.opacity = smooth(t / T.reveal) * 0.85;

    let liftY = 0;

    if (t < T.freeze) {
      /* ---- vortex phase ---- */
      if (vortexRef.current && vAngles.current) {
        const arr = vortexRef.current.geometry.attributes.position.array;
        const spiralP = t < T.spiral ? 0 : smooth((t - T.spiral) / (T.freeze - T.spiral));

        for (let i = 0; i < V; i++) {
          const speed = vSpeeds.current[i] * (1 + spiralP * 14);
          vAngles.current[i] += delta * speed;
          const r = vRadii0.current[i] * (1 - spiralP * 0.97);
          const y = vYs0.current[i]    * (1 - spiralP);
          arr[i*3]   = Math.cos(vAngles.current[i]) * r;
          arr[i*3+1] = y;
          arr[i*3+2] = Math.sin(vAngles.current[i]) * r;
        }
        vortexRef.current.geometry.attributes.position.needsUpdate = true;

        /* fade in then fade out as core brightens */
        const fadeIn  = smooth(clamp01((t - T.reveal + 0.1) / 1.2));
        const fadeOut = t > T.freeze - 1.5 ? smooth((t - (T.freeze - 1.5)) / 1.5) : 0;
        if (vortexMat.current) vortexMat.current.opacity = fadeIn * (1 - fadeOut) * 0.8;
      }

      /* singularity core */
      if (coreRef.current && coreMat.current && t > T.spiral) {
        const cp = smooth((t - T.spiral) / (T.freeze - T.spiral));
        coreRef.current.visible = true;
        coreMat.current.emissiveIntensity = cp * 10;
        const pulse = cp > 0.75 ? 1 + Math.sin(et * 35) * 0.18 * ((cp - 0.75) / 0.25) : 1;
        coreRef.current.scale.setScalar((0.01 + cp * 0.28) * pulse);
        if (coreLight.current) coreLight.current.intensity = cp * 8;
      }

      /* camera: overhead angle → straight-on zoom */
      let camZ, camY;
      if (t < T.spiral) {
        const p = smooth(t / T.spiral);
        camZ = lerp(20, 13, p);
        camY = lerp(5, 2, p);
      } else {
        const p = smooth((t - T.spiral) / (T.freeze - T.spiral));
        camZ = lerp(13, 8.5, p);
        camY = lerp(2, 0.3, p);
      }
      camera.position.set(0, camY, camZ);
      camera.lookAt(0, 0, 0);

    } else {
      /* ---- post-explosion phase ---- */
      if (vortexRef.current) vortexRef.current.visible = false;
      if (coreRef.current)   coreRef.current.visible   = false;
      if (coreLight.current) coreLight.current.intensity = 0;
      if (!exploded.current) exploded.current = true;

      const arr = points.current.geometry.attributes.position.array;
      const tt  = t - T.freeze;
      const dAssemble = T.assemble - T.freeze;
      const dLift     = T.lift - T.assemble;

      if (tt < dAssemble) {
        const a     = smooth(tt / dAssemble);
        const bulge = Math.sin(a * Math.PI) * 3.0;
        for (let i = 0; i < N; i++) {
          arr[i*3]   = lerp(origins[i*3],   hkTargets[i*3],   a) + dirs[i*3]   * bulge;
          arr[i*3+1] = lerp(origins[i*3+1], hkTargets[i*3+1], a) + dirs[i*3+1] * bulge;
          arr[i*3+2] = lerp(origins[i*3+2], hkTargets[i*3+2], a) + dirs[i*3+2] * bulge;
        }
      } else if (tt < dAssemble + dLift) {
        liftY = smooth((tt - dAssemble) / dLift) * 1.6;
        for (let i = 0; i < N; i++) {
          arr[i*3]=hkTargets[i*3]; arr[i*3+1]=hkTargets[i*3+1]; arr[i*3+2]=hkTargets[i*3+2];
        }
      } else {
        liftY = 1.6;
        for (let i = 0; i < N; i++) {
          arr[i*3]=hkTargets[i*3]; arr[i*3+1]=hkTargets[i*3+1]; arr[i*3+2]=hkTargets[i*3+2];
        }
        if (points.current.material)
          points.current.material.opacity = 1 - smooth((tt - dAssemble - dLift) / 0.8);
      }
      points.current.geometry.attributes.position.needsUpdate = true;

      camera.position.set(0, 0.6, 9.5);
      camera.lookAt(0, 0.7, 0);
    }

    if (points.current) {
      points.current.visible = exploded.current;
      points.current.position.set(0, liftY, 0);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.08} />
      <pointLight ref={coreLight} position={[0, 0, 0]} intensity={0} color="#88aaff" distance={25} />

      {/* stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={starPositions} count={starPositions.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial ref={starsMat} size={0.06} color="#ffffff" sizeAttenuation transparent opacity={0} depthWrite={false} />
      </points>

      {/* galaxy vortex */}
      <points ref={vortexRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={vortexInitPos} count={V} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial ref={vortexMat} size={0.04} color="#a0ccff" sizeAttenuation transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      {/* singularity core */}
      <mesh ref={coreRef} visible={false}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial ref={coreMat} color="#ffffff" emissive="#7ab0ff" emissiveIntensity={0} />
      </mesh>

      {/* HK particles */}
      <points ref={points} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={N} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#cfeaff" sizeAttenuation transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <EffectComposer>
        <Bloom intensity={2.4} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </group>
  );
}

/* ---------- main overlay ---------- */
export default function CinematicIntro() {
  const [mounted, setMounted] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  const finishIntro = () => {
    setDone(true);
    window.dispatchEvent(new Event("intro-done"));
  };

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.remove("intro-playing");
    const base = T.lift * 1000;
    const timers = [
      setTimeout(() => setShowHero(true), base + 100),
      setTimeout(() => setStage(1), base + 1000),
      setTimeout(() => setStage(2), base + 1900),
      setTimeout(() => finishIntro(), base + 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  const btn =
    "rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] overflow-hidden bg-black"
        exit={{ opacity: 0 }}
        animate={{ opacity: done ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0">
          {mounted && (
            <Canvas
              camera={{ position: [0, 5, 20], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false }}
            >
              <color attach="background" args={["#01030a"]} />
              <fog attach="fog" args={["#01030a", 15, 55]} />
              <Sequence />
            </Canvas>
          )}
        </div>

        <AnimatePresence>
          {showHero && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: stage >= 1 ? -44 : 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <NameReveal stage={stage} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.4 }}
                className="mt-2 text-sm uppercase tracking-[0.3em] text-white/70 md:text-lg"
              >
                Full Stack Developer · Cloud Engineer · Problem Solver
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 2.7 }}
                className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base"
              >
                Building scalable applications, crafting digital experiences, and
                transforming ideas into reality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 3.0 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <Link href="/work" className={btn} onClick={finishIntro}>
                  View Projects
                </Link>
                <a href="/resume/Hemanth_Kata_Python.pdf" download className={btn}>
                  Download Resume
                </a>
                <Link href="/contact" className={btn} onClick={finishIntro}>
                  Contact Me
                </Link>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.4 }}
                onClick={finishIntro}
                className="mt-12 text-xs uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
              >
                Enter site ↓
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {!showHero && (
          <button
            onClick={finishIntro}
            className="absolute bottom-6 right-6 z-20 text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
          >
            Skip intro →
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
