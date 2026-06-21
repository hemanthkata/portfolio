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
  reveal: 2.5, // stars + distant asteroid
  approach: 5.5, // camera pushes in / orbits
  accelerate: 7.5, // blue trail, speeds toward us
  atmosphere: 9.3, // flames
  freeze: 10.3, // stops, core glows
  assemble: 12.5, // explode -> particles form HK
  lift: 13.7, // HK particles move up
  expand: 15.6, // particles extend into "Hemanth Kata"
};

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = (x) => {
  x = clamp01(x);
  return x * x * (3 - 2 * x);
};
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- realistic displaced asteroid geometry ---------- */
function useAsteroidGeometry() {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 4);
    const pos = geo.attributes.position;

    const craters = [];
    for (let i = 0; i < 9; i++) {
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      craters.push({ dir, cos: 0.86 + Math.random() * 0.1, depth: 0.18 + Math.random() * 0.22 });
    }

    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const dir = v.clone().normalize();
      let d =
        0.16 * Math.sin(dir.x * 4.0 + dir.y * 2.0) +
        0.12 * Math.sin(dir.y * 7.0 + dir.z * 3.0 + 1.3) +
        0.08 * Math.sin(dir.z * 11.0 + dir.x * 5.0 + 2.1) +
        0.05 * Math.sin(dir.x * 17.0 + dir.z * 9.0 + 0.7);
      for (const c of craters) {
        const dot = dir.dot(c.dir);
        if (dot > c.cos) {
          const f = (dot - c.cos) / (1 - c.cos);
          d -= c.depth * f * f;
        }
      }
      v.copy(dir).multiplyScalar(1.5 * (1 + d));
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

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
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4] > 128) pts.push([x, y]);
    }
  }
  const scale = worldW / W;
  const targets = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = pts.length ? pts[(Math.random() * pts.length) | 0] : [W / 2, H / 2];
    targets[i * 3] = (p[0] - W / 2) * scale;
    targets[i * 3 + 1] = -(p[1] - H / 2) * scale;
    targets[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
  }
  return targets;
}

/* ---------- the 3D sequence ---------- */
function Sequence() {
  const { camera } = useThree();
  const t0 = useRef(null);

  const asteroidGeo = useAsteroidGeometry();
  const asteroid = useRef();
  const asteroidMat = useRef();
  const debris = useRef();
  const dust = useRef();
  const trail = useRef();
  const flames = useRef();
  const embers = useRef();
  const starsMat = useRef();
  const points = useRef();
  const exploded = useRef(false);

  const N = 5000;
  const { positions, origins, dirs, hkTargets, nameTargets } = useMemo(() => {
    const hkTargets = sampleTextTargets("HK", N, 3.6);
    const positions = new Float32Array(N * 3);
    const origins = new Float32Array(N * 3);
    const dirs = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const dv = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      dirs[i * 3] = dv.x;
      dirs[i * 3 + 1] = dv.y;
      dirs[i * 3 + 2] = dv.z;
      origins[i * 3] = dv.x * 0.4;
      origins[i * 3 + 1] = dv.y * 0.4;
      origins[i * 3 + 2] = dv.z * 0.4;
      positions[i * 3] = origins[i * 3];
      positions[i * 3 + 1] = origins[i * 3 + 1];
      positions[i * 3 + 2] = origins[i * 3 + 2];
    }
    return { positions, origins, dirs, hkTargets };
  }, []);

  const starPositions = useMemo(() => {
    const M = 1800;
    const a = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) {
      a[i * 3] = (Math.random() - 0.5) * 60;
      a[i * 3 + 1] = (Math.random() - 0.5) * 60;
      a[i * 3 + 2] = -10 - Math.random() * 50;
    }
    return a;
  }, []);

  const dustPositions = useMemo(() => {
    const M = 700;
    const a = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) {
      const r = 2 + Math.random() * 5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(ph) * Math.cos(th);
      a[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      a[i * 3 + 2] = r * Math.cos(ph);
    }
    return a;
  }, []);

  const emberPositions = useMemo(() => {
    const M = 240;
    const a = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) {
      a[i * 3] = (Math.random() - 0.5) * 1.6;
      a[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
      a[i * 3 + 2] = -Math.random() * 6;
    }
    return a;
  }, []);

  useFrame((state, delta) => {
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - t0.current;

    if (asteroid.current) {
      asteroid.current.rotation.y += delta * 0.18;
      asteroid.current.rotation.x += delta * 0.06;
    }
    if (debris.current) debris.current.rotation.y += delta * 0.1;
    if (dust.current) dust.current.rotation.y += delta * 0.05;

    if (starsMat.current) starsMat.current.opacity = smooth(t / T.reveal) * 0.9;

    let camX = 0,
      camY = 0.6,
      camZ = 20,
      astZ = 0,
      astScale = 1;
    let emissive = 0.05;
    let trailOp = 0,
      flameOp = 0;
    let liftY = 0;

    if (t < T.approach) {
      const p = smooth(t / T.approach);
      camZ = lerp(20, 9, p);
      camX = Math.sin(p * Math.PI) * 3.5;
      camY = lerp(1.2, 0.6, p);
    } else if (t < T.accelerate) {
      const q = smooth((t - T.approach) / (T.accelerate - T.approach));
      camZ = lerp(9, 11, q);
      camX = lerp(0, 0, q);
      astZ = lerp(0, 4, q);
      astScale = lerp(1, 1.2, q);
      trailOp = q;
    } else if (t < T.atmosphere) {
      const a = smooth((t - T.accelerate) / (T.atmosphere - T.accelerate));
      camZ = 11;
      astZ = lerp(4, 5.2, a);
      astScale = 1.2;
      trailOp = 1 - a * 0.5;
      flameOp = a;
      camX = (Math.random() - 0.5) * 0.35 * a;
      camY = 0.6 + (Math.random() - 0.5) * 0.35 * a;
    } else if (t < T.freeze) {
      const f = smooth((t - T.atmosphere) / (T.freeze - T.atmosphere));
      camZ = lerp(11, 9.5, f);
      astZ = 5.2;
      astScale = 1.2;
      flameOp = 1 - f;
      emissive = lerp(0.05, 2.6, f);
    } else {
      if (!exploded.current) {
        exploded.current = true;
        if (asteroid.current) asteroid.current.visible = false;
      }
      const arr = points.current.geometry.attributes.position.array;
      const tt = t - T.freeze;
      const dAssemble = T.assemble - T.freeze;
      const dLift = T.lift - T.assemble;
      const dExpand = T.expand - T.lift;

      if (tt < dAssemble) {
        // explosion debris -> form HK
        const a = smooth(tt / dAssemble);
        for (let i = 0; i < N; i++) {
          const bx = lerp(origins[i * 3], hkTargets[i * 3], a);
          const by = lerp(origins[i * 3 + 1], hkTargets[i * 3 + 1], a);
          const bz = lerp(origins[i * 3 + 2], hkTargets[i * 3 + 2], a);
          const bulge = Math.sin(a * Math.PI) * 3.0;
          arr[i * 3] = bx + dirs[i * 3] * bulge;
          arr[i * 3 + 1] = by + dirs[i * 3 + 1] * bulge;
          arr[i * 3 + 2] = bz + dirs[i * 3 + 2] * bulge;
        }
      } else if (tt < dAssemble + dLift) {
        // HK holds shape and moves up
        liftY = smooth((tt - dAssemble) / dLift) * 1.6;
        for (let i = 0; i < N; i++) {
          arr[i * 3] = hkTargets[i * 3];
          arr[i * 3 + 1] = hkTargets[i * 3 + 1];
          arr[i * 3 + 2] = hkTargets[i * 3 + 2];
        }
      } else {
        // HK holds lifted, then fades out as the normal-font name takes over
        liftY = 1.6;
        for (let i = 0; i < N; i++) {
          arr[i * 3] = hkTargets[i * 3];
          arr[i * 3 + 1] = hkTargets[i * 3 + 1];
          arr[i * 3 + 2] = hkTargets[i * 3 + 2];
        }
        if (points.current.material) {
          points.current.material.opacity = 1 - smooth((tt - dAssemble - dLift) / 0.8);
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
      camX = 0;
      camY = 0.6;
      camZ = 9.5;
    }

    if (asteroid.current) {
      asteroid.current.position.z = astZ;
      asteroid.current.scale.setScalar(astScale);
    }
    if (asteroidMat.current) asteroidMat.current.emissiveIntensity = emissive;
    if (trail.current) {
      trail.current.visible = trailOp > 0.01;
      trail.current.position.z = astZ - 3;
      trail.current.material.opacity = 0.5 * trailOp;
    }
    if (flames.current) {
      flames.current.visible = flameOp > 0.01;
      flames.current.position.z = astZ + 0.5;
      flames.current.material.opacity = 0.6 * flameOp;
      const fl = 1 + Math.sin(state.clock.elapsedTime * 28) * 0.12;
      flames.current.scale.set(fl, fl * 1.4, fl);
    }
    if (embers.current) {
      const op = Math.max(trailOp, flameOp);
      embers.current.visible = op > 0.01;
      embers.current.position.z = astZ - 1.2;
      embers.current.rotation.z += delta * 0.7;
      embers.current.material.opacity = (0.45 + Math.sin(state.clock.elapsedTime * 24) * 0.25) * op;
    }
    if (points.current) {
      points.current.visible = exploded.current;
      points.current.position.set(0, liftY, 0);
    }

    camera.position.set(camX, camY, camZ);
    camera.lookAt(0, exploded.current ? 0.7 : astZ * 0.4, exploded.current ? 0 : astZ);
  });

  return (
    <group>
      <ambientLight intensity={0.25} />
      <directionalLight position={[-5, 4, 6]} intensity={2.2} color="#cfe6ff" />
      <pointLight position={[4, -2, 4]} intensity={1.4} color="#3a86ff" />

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={starPositions}
            count={starPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={starsMat}
          size={0.07}
          color="#ffffff"
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
        />
      </points>

      <mesh ref={asteroid} geometry={asteroidGeo}>
        <meshStandardMaterial
          ref={asteroidMat}
          color="#544d44"
          roughness={0.95}
          metalness={0.05}
          emissive="#3a86ff"
          emissiveIntensity={0.05}
        />
      </mesh>

      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={dustPositions}
            count={dustPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#9fb8d6" sizeAttenuation transparent opacity={0.5} depthWrite={false} />
      </points>

      <group ref={debris}>
        {[...Array(7)].map((_, i) => {
          const ang = (i / 7) * Math.PI * 2;
          const rad = 3 + (i % 3);
          return (
            <mesh
              key={i}
              geometry={asteroidGeo}
              position={[Math.cos(ang) * rad, Math.sin(ang * 1.3) * 1.6, Math.sin(ang) * rad]}
              scale={0.12 + (i % 3) * 0.05}
            >
              <meshStandardMaterial color="#4a443c" roughness={1} metalness={0.05} />
            </mesh>
          );
        })}
      </group>

      <mesh ref={trail} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <coneGeometry args={[1.0, 7, 24, 1, true]} />
        <meshBasicMaterial
          color="#3aa0ff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={flames} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <coneGeometry args={[1.6, 5, 24, 1, true]} />
        <meshBasicMaterial
          color="#ff6a1a"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ember / spark trail */}
      <points ref={embers} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={emberPositions}
            count={emberPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#ffb24a"
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={points} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={N} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#cfeaff"
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.18} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </group>
  );
}

/* ---------- main overlay ---------- */
export default function CinematicIntro() {
  const [mounted, setMounted] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [stage, setStage] = useState(0); // 0: HK · 1: split apart · 2: Hemanth Kata
  const [done, setDone] = useState(false);

  const finishIntro = () => {
    setDone(true);
    sessionStorage.setItem("intro-done", "1");
    window.dispatchEvent(new Event("intro-done"));
  };

  useEffect(() => {
    setMounted(true);
    const base = T.lift * 1000; // after the particle HK has lifted
    const timers = [
      setTimeout(() => setShowHero(true), base + 100), // font HK appears as particles fade
      setTimeout(() => setStage(1), base + 1000), // HK splits apart
      setTimeout(() => setStage(2), base + 1900), // reveal "Hemanth Kata"
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
              camera={{ position: [0, 0.6, 20], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false }}
            >
              <color attach="background" args={["#01030a"]} />
              <fog attach="fog" args={["#01030a", 12, 45]} />
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
              {/* normal-font name: HK splits into "Hemanth Kata" */}
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
