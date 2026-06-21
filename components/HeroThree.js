"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  TorusKnot,
  MeshDistortMaterial,
  Environment,
  Octahedron,
  Box,
  Sphere,
  Torus,
} from "@react-three/drei";
import { useMemo, useRef } from "react";

/* 1 — Particle wave */
function ParticleWave() {
  const ref = useRef();
  const side = 60;
  const positions = useMemo(() => {
    const arr = new Float32Array(side * side * 3);
    let i = 0;
    for (let x = 0; x < side; x++) {
      for (let z = 0; z < side; z++) {
        arr[i++] = (x - side / 2) * 0.18;
        arr[i++] = 0;
        arr[i++] = (z - side / 2) * 0.18;
      }
    }
    return arr;
  }, []);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const g = ref.current.geometry;
    const p = g.attributes.position.array;
    for (let k = 0; k < p.length; k += 3) {
      const x = p[k];
      const z = p[k + 2];
      p[k + 1] = Math.sin(x * 0.6 + t) * 0.4 + Math.cos(z * 0.6 + t * 0.8) * 0.4;
    }
    g.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.06;
  });

  return (
    <points ref={ref} rotation={[-0.8, 0, 0]} position={[0, -0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#e8ff63" sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

/* 2 — Wireframe icosahedron */
function WireframeIco() {
  const r = useRef();
  useFrame((s, d) => {
    if (r.current) {
      r.current.rotation.x += d * 0.15;
      r.current.rotation.y += d * 0.2;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <Icosahedron ref={r} args={[2.1, 1]}>
        <meshBasicMaterial color="#e8ff63" wireframe />
      </Icosahedron>
    </Float>
  );
}

/* 3 — Wireframe torus knot */
function WireframeTorus() {
  const r = useRef();
  useFrame((s, d) => {
    if (r.current) {
      r.current.rotation.x += d * 0.2;
      r.current.rotation.y += d * 0.15;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1}>
      <TorusKnot ref={r} args={[1.3, 0.38, 180, 32]}>
        <meshBasicMaterial color="#e8ff63" wireframe />
      </TorusKnot>
    </Float>
  );
}

/* 6 — Starfield */
function Starfield() {
  const ref = useRef();
  const N = 1600;
  const positions = useMemo(() => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      a[i * 3] = (Math.random() - 0.5) * 14;
      a[i * 3 + 1] = (Math.random() - 0.5) * 14;
      a[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return a;
  }, []);
  useFrame((s, d) => {
    const p = ref.current.geometry.attributes.position.array;
    for (let i = 2; i < p.length; i += 3) {
      p[i] += d * 2.2;
      if (p[i] > 7) p[i] = -7;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.z += d * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={N} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ffffff" sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

/* 7 — Dark glass sphere */
function DarkSphere() {
  const r = useRef();
  useFrame((s, d) => {
    if (r.current) r.current.rotation.y += d * 0.15;
  });
  return (
    <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={r} args={[1.8, 16]}>
        <MeshDistortMaterial
          color="#0d0f1a"
          roughness={0.05}
          metalness={1}
          distort={0.4}
          speed={1.6}
        />
      </Icosahedron>
    </Float>
  );
}

/* 8 — Floating shapes */
function FloatingShapes() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Octahedron args={[0.7]} position={[-2.6, 1.2, 0]}>
          <meshStandardMaterial color="#e8ff63" metalness={0.6} roughness={0.25} />
        </Octahedron>
      </Float>
      <Float speed={1.1} rotationIntensity={1.2} floatIntensity={1.2}>
        <Box args={[1, 1, 1]} position={[2.4, 0.6, -1]}>
          <meshStandardMaterial color="#16161d" metalness={0.85} roughness={0.15} />
        </Box>
      </Float>
      <Float speed={1.7} rotationIntensity={0.6} floatIntensity={1.6}>
        <Sphere args={[0.55, 48, 48]} position={[1.4, -1.6, 0]}>
          <meshStandardMaterial color="#e8ff63" metalness={0.3} roughness={0.4} />
        </Sphere>
      </Float>
      <Float speed={1.3} rotationIntensity={1.4} floatIntensity={1.3}>
        <Torus args={[0.55, 0.18, 32, 80]} position={[-1.8, -1.2, 1]}>
          <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
        </Torus>
      </Float>
    </>
  );
}

export default function HeroThree({ variant = 1 }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={2.2} />
      <pointLight position={[-4, -2, -2]} intensity={1.6} color="#e8ff63" />
      {variant === 1 && <ParticleWave />}
      {variant === 2 && <WireframeIco />}
      {variant === 3 && <WireframeTorus />}
      {variant === 6 && <Starfield />}
      {variant === 7 && <DarkSphere />}
      {variant === 8 && <FloatingShapes />}
      {(variant === 7 || variant === 8) && <Environment preset="city" />}
    </Canvas>
  );
}
