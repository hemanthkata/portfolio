"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Environment } from "@react-three/drei";
import { useEffect, useRef } from "react";

function Blob() {
  const mesh = useRef();
  // target mouse position (normalized -1..1), tracked on window
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const m = mesh.current;
    if (!m) return;

    // continuous slow spin
    m.rotation.y = t * 0.18;

    // smoothly steer toward the mouse (lerp)
    const lerp = Math.min(1, delta * 3);
    m.rotation.x += (mouse.current.y * 0.6 - m.rotation.x) * lerp;
    m.rotation.z += (mouse.current.x * 0.4 - m.rotation.z) * lerp;
    m.position.x += (mouse.current.x * 0.8 - m.position.x) * lerp;
    m.position.y += (mouse.current.y * 0.6 - m.position.y) * lerp;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <Icosahedron ref={mesh} args={[1.6, 12]}>
        <MeshDistortMaterial
          color="#e8ff63"
          emissive="#3a4a00"
          roughness={0.15}
          metalness={0.85}
          distort={0.42}
          speed={1.8}
        />
      </Icosahedron>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={2.2} />
      <pointLight position={[-4, -2, -2]} intensity={2} color="#e8ff63" />
      <Blob />
      <Environment preset="city" />
    </Canvas>
  );
}
