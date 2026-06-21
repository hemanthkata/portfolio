"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

/* ---------- timeline (seconds) ---------- */
const T = {
  reveal:   2.0,  // stars + vortex fade in
  spiral:   3.5,  // vortex accelerates inward
  freeze:   8.0,  // singularity explodes
  assemble: 10.5, // particles form HK
  lift:     11.7, // HK lifts up
  expand:   13.2, // HK particles split → Hemanth Kata
  settle:   16.0, // name fully formed
};

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth  = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };
const lerp    = (a, b, t) => a + (b - a) * t;

/* ---------- sample text into 3D particle targets ---------- */
function sampleTextTargets(text, count, worldW) {
  const fontPx = 200;
  const pad = 24;
  const c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  ctx.font = `bold ${fontPx}px Arial, sans-serif`;
  const tw = Math.ceil(ctx.measureText(text).width);
  const W = tw + pad * 2;
  const H = fontPx + pad * 2;
  c.width = W; c.height = H;
  ctx = c.getContext("2d");
  ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${fontPx}px Arial, sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
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
    targets[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
  }
  return targets;
}

/* ---------- galaxy vortex → singularity → HK → Hemanth Kata ---------- */
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

  const vAngles = useRef(null);
  const vRadii0 = useRef(null);
  const vSpeeds = useRef(null);
  const vYs0    = useRef(null);

  const N = 5000;
  const V = 3500;

  /* particle geometry + both text targets */
  const { positions, origins, dirs, hkTargets, nameTargets } = useMemo(() => {
    const hkTargets   = sampleTextTargets("HK", N, 3.6);
    const nameTargets = sampleTextTargets("Hemanth Kata", N, 8.5);
    const positions   = new Float32Array(N * 3);
    const origins     = new Float32Array(N * 3);
    const dirs        = new Float32Array(N * 3);
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
    return { positions, origins, dirs, hkTargets, nameTargets };
  }, []);

  /* galaxy vortex */
  const vortexInitPos = useMemo(() => {
    const angles = new Float32Array(V);
    const radii  = new Float32Array(V);
    const speeds = new Float32Array(V);
    const ys     = new Float32Array(V);
    const pos    = new Float32Array(V * 3);
    for (let i = 0; i < V; i++) {
      const r     = 1.2 + Math.pow(Math.random(), 0.6) * 7.0;
      const angle = Math.random() * Math.PI * 2;
      const a     = angle + (r / 8) * 1.2;
      const y     = (Math.random() - 0.5) * 1.0 * (1 - r / 9);
      angles[i] = a; radii[i] = r;
      speeds[i] = (0.15 + Math.random() * 0.35) / Math.sqrt(r);
      ys[i] = y;
      pos[i*3]=Math.cos(a)*r; pos[i*3+1]=y; pos[i*3+2]=Math.sin(a)*r;
    }
    vAngles.current = angles; vRadii0.current = radii;
    vSpeeds.current = speeds; vYs0.current    = ys;
    return pos;
  }, []);

  /* star field */
  const starPositions = useMemo(() => {
    const M = 2000; const a = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) {
      a[i*3]=(Math.random()-0.5)*80; a[i*3+1]=(Math.random()-0.5)*80;
      a[i*3+2]=-15-Math.random()*50;
    }
    return a;
  }, []);

  useFrame((state, delta) => {
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const t  = state.clock.elapsedTime - t0.current;
    const et = state.clock.elapsedTime;

    if (starsMat.current) starsMat.current.opacity = smooth(t / T.reveal) * 0.85;

    let liftY = 0;

    if (t < T.freeze) {
      /* vortex spin + inward collapse */
      if (vortexRef.current && vAngles.current) {
        const arr     = vortexRef.current.geometry.attributes.position.array;
        const spiralP = t < T.spiral ? 0 : smooth((t - T.spiral) / (T.freeze - T.spiral));
        for (let i = 0; i < V; i++) {
          vAngles.current[i] += delta * vSpeeds.current[i] * (1 + spiralP * 14);
          const r = vRadii0.current[i] * (1 - spiralP * 0.97);
          const y = vYs0.current[i]    * (1 - spiralP);
          arr[i*3]=Math.cos(vAngles.current[i])*r;
          arr[i*3+1]=y;
          arr[i*3+2]=Math.sin(vAngles.current[i])*r;
        }
        vortexRef.current.geometry.attributes.position.needsUpdate = true;
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

      /* camera zoom toward center */
      const camZ = t < T.spiral
        ? lerp(20, 13, smooth(t / T.spiral))
        : lerp(13, 8.5, smooth((t - T.spiral) / (T.freeze - T.spiral)));
      const camY = t < T.spiral
        ? lerp(5, 2, smooth(t / T.spiral))
        : lerp(2, 0.3, smooth((t - T.spiral) / (T.freeze - T.spiral)));
      camera.position.set(0, camY, camZ);
      camera.lookAt(0, 0, 0);

    } else {
      /* post-explosion */
      if (vortexRef.current) vortexRef.current.visible = false;
      if (coreRef.current)   coreRef.current.visible   = false;
      if (coreLight.current) coreLight.current.intensity = 0;
      if (!exploded.current) exploded.current = true;

      const arr = points.current.geometry.attributes.position.array;
      const tt  = t - T.freeze;
      const dAssemble = T.assemble - T.freeze; // 2.5s
      const dLift     = T.lift    - T.assemble; // 1.2s
      const dExpand   = T.expand  - T.lift;     // 1.5s
      const dSettle   = T.settle  - T.expand;   // 2.8s

      if (tt < dAssemble) {
        /* scattered → HK */
        const a     = smooth(tt / dAssemble);
        const bulge = Math.sin(a * Math.PI) * 3.0;
        for (let i = 0; i < N; i++) {
          arr[i*3]   = lerp(origins[i*3],   hkTargets[i*3],   a) + dirs[i*3]   * bulge;
          arr[i*3+1] = lerp(origins[i*3+1], hkTargets[i*3+1], a) + dirs[i*3+1] * bulge;
          arr[i*3+2] = lerp(origins[i*3+2], hkTargets[i*3+2], a) + dirs[i*3+2] * bulge;
        }
        liftY = 0;
      } else if (tt < dAssemble + dLift) {
        /* HK holds, moves up */
        liftY = smooth((tt - dAssemble) / dLift) * 1.2;
        for (let i = 0; i < N; i++) {
          arr[i*3]=hkTargets[i*3]; arr[i*3+1]=hkTargets[i*3+1]; arr[i*3+2]=hkTargets[i*3+2];
        }
      } else if (tt < dAssemble + dLift + dExpand) {
        /* HK → Hemanth Kata: particles flow from lifted HK to centered name */
        const a = smooth((tt - dAssemble - dLift) / dExpand);
        liftY = lerp(1.2, 0, a); // descend back to center as name expands
        for (let i = 0; i < N; i++) {
          arr[i*3]   = lerp(hkTargets[i*3],   nameTargets[i*3],   a);
          arr[i*3+1] = lerp(hkTargets[i*3+1], nameTargets[i*3+1], a);
          arr[i*3+2] = lerp(hkTargets[i*3+2], nameTargets[i*3+2], a);
        }
      } else {
        /* Hemanth Kata holds */
        liftY = 0;
        for (let i = 0; i < N; i++) {
          arr[i*3]=nameTargets[i*3]; arr[i*3+1]=nameTargets[i*3+1]; arr[i*3+2]=nameTargets[i*3+2];
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;

      /* camera: tight on HK → zoom out for full name */
      const nameFrac = tt < dAssemble + dLift ? 0
        : tt < dAssemble + dLift + dExpand
          ? smooth((tt - dAssemble - dLift) / dExpand) : 1;
      const camZ = lerp(9.5, 14, nameFrac);
      camera.position.set(0, 0.6, camZ);
      camera.lookAt(0, liftY + 0.3, 0);
    }

    if (points.current) {
      points.current.visible = exploded.current;
      points.current.position.set(0, liftY, 0);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.08} />
      <pointLight ref={coreLight} position={[0,0,0]} intensity={0} color="#88aaff" distance={25} />

      {/* stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={starPositions} count={starPositions.length/3} itemSize={3} />
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

      {/* HK → Hemanth Kata particles */}
      <points ref={points} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={N} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color="#cfeaff" sizeAttenuation transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <EffectComposer>
        <Bloom intensity={2.4} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </group>
  );
}

/* ---------- overlay UI ---------- */
export default function CinematicIntro() {
  const [mounted,  setMounted]  = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [done,     setDone]     = useState(false);

  const finishIntro = () => {
    setDone(true);
    window.dispatchEvent(new Event("intro-done"));
  };

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.remove("intro-playing");
    const base = T.settle * 1000; // after Hemanth Kata is fully formed
    const timers = [
      setTimeout(() => setShowHero(true), base + 200),  // subtitle fades in
      setTimeout(() => finishIntro(),     base + 6500), // auto-dismiss
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
              <fog attach="fog" args={["#01030a", 18, 60]} />
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
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-sm uppercase tracking-[0.3em] text-white/70 md:text-lg"
              >
                Full Stack Developer · Cloud Engineer · Problem Solver
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base"
              >
                Building scalable applications, crafting digital experiences, and
                transforming ideas into reality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
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
                transition={{ delay: 1.5 }}
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
