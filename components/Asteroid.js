"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Meteor() {
  const group = useRef();
  const rock = useRef();
  const flameOuter = useRef();
  const flameInner = useRef();
  const light = useRef();
  const start = useRef(null);

  useFrame((s, d) => {
    if (start.current === null) start.current = s.clock.elapsedTime;
    const t = s.clock.elapsedTime - start.current;
    const dur = 3.4;
    let p = Math.min(t / dur, 1);
    const eased = p * p; // accelerate toward the screen

    if (group.current) {
      // from far upper-left, flying toward (and past) the camera
      group.current.position.set(-7 + 7 * eased, 5 - 5 * eased, -26 + 34 * eased);
    }
    if (rock.current) {
      rock.current.rotation.x += d * 1.0;
      rock.current.rotation.y += d * 1.4;
      // heats up as it gets closer
      rock.current.material.emissiveIntensity = 0.4 + eased * 2.2;
    }
    // flicker the flames
    const flick = 1 + Math.sin(s.clock.elapsedTime * 30) * 0.12 + Math.sin(s.clock.elapsedTime * 17) * 0.08;
    const grow = 0.7 + eased * 0.9;
    if (flameOuter.current) {
      flameOuter.current.scale.set(grow * flick, grow * (1 + eased), grow * flick);
    }
    if (flameInner.current) {
      flameInner.current.scale.set(grow * flick * 0.8, grow * (1 + eased) * 0.9, grow * flick * 0.8);
    }
    if (light.current) {
      light.current.intensity = 2 + eased * 6 + Math.sin(s.clock.elapsedTime * 25) * 0.6;
    }
  });

  return (
    <group ref={group}>
      {/* glowing orange light cast by the meteor */}
      <pointLight ref={light} color="#ff6a00" intensity={2} distance={20} />

      {/* the rock */}
      <mesh ref={rock}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#5a534c"
          emissive="#ff4400"
          emissiveIntensity={0.5}
          roughness={1}
          metalness={0.15}
          flatShading
        />
      </mesh>

      {/* outer flame trail (points backward, -z) */}
      <mesh ref={flameOuter} position={[0.3, -0.25, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[1.1, 6, 24, 1, true]} />
        <meshBasicMaterial
          color="#ff5a00"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* inner flame (hotter, yellow) */}
      <mesh ref={flameInner} position={[0.2, -0.18, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.6, 4, 20, 1, true]} />
        <meshBasicMaterial
          color="#ffd24a"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const N = 600;
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      a[i * 3] = (Math.random() - 0.5) * 34;
      a[i * 3 + 1] = (Math.random() - 0.5) * 34;
      a[i * 3 + 2] = -12 - Math.random() * 24;
    }
    return a;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export default function Asteroid() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[-3, 4, 5]} intensity={1.8} />
      <Stars />
      <Meteor />
    </Canvas>
  );
}
