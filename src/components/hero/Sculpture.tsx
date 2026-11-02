"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { SculptureFallback } from "@/components/hero/SculptureFallback";

type Palette = { ink: string; paper: string; accent: string; accent2: string };

const studioPalette: Palette = {
  ink: "#080d18",
  paper: "#f7f9fc",
  accent: "#536dff",
  accent2: "#8b5cf6",
};

function usePalette() {
  const [palette, setPalette] = useState(studioPalette);

  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      const next = {
        ink: style.getPropertyValue("--ink").trim() || studioPalette.ink,
        paper: style.getPropertyValue("--paper").trim() || studioPalette.paper,
        accent: style.getPropertyValue("--accent").trim() || studioPalette.accent,
        accent2: style.getPropertyValue("--accent-2").trim() || studioPalette.accent2,
      };
      setPalette(next);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return palette;
}

function Fold({ pointer, palette }: { pointer: RefObject<{ x: number; y: number }>; palette: Palette }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const current = group.current;
    if (!current) return;
    const time = state.clock.elapsedTime;
    const x = pointer.current?.x ?? 0;
    const y = pointer.current?.y ?? 0;
    current.rotation.y = THREE.MathUtils.damp(
      current.rotation.y,
      x * 0.42 + Math.sin(time * 0.32) * 0.28,
      2.4,
      delta,
    );
    current.rotation.x = THREE.MathUtils.damp(current.rotation.x, -0.16 + y * -0.16, 2.4, delta);
    current.position.y = Math.sin(time * 0.7) * 0.14;
  });

  return (
    <group ref={group} position={[-0.35, 0.05, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0.15]} position={[0.15, -1.72, 0.05]}>
        <circleGeometry args={[1.85, 48]} />
        <meshBasicMaterial color={palette.ink} transparent opacity={0.55} />
      </mesh>
      <mesh position={[-0.72, 0.16, -0.05]} rotation={[0.04, -0.72, 0.02]}>
        <boxGeometry args={[1.15, 3.35, 0.045]} />
        <meshPhysicalMaterial color="#e8eefc" metalness={0.92} roughness={0.16} clearcoat={0.6} />
      </mesh>
      <mesh position={[-0.72, 0.16, 0.02]} rotation={[0.04, -0.72, 0.02]}>
        <boxGeometry args={[0.018, 3.15, 0.02]} />
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={6} toneMapped={false} />
      </mesh>
      <mesh position={[0.42, 0.02, 0.42]} rotation={[0.08, 0.78, -0.03]}>
        <boxGeometry args={[1.55, 2.85, 0.04]} />
        <meshPhysicalMaterial
          color="#f4f7ff"
          roughness={0.04}
          metalness={0}
          transmission={0.86}
          thickness={0.85}
          ior={1.48}
          attenuationColor={palette.accent}
          attenuationDistance={1.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      <mesh position={[0.08, -1.15, 0.12]} rotation={[0.18, 0.2, 0.04]}>
        <boxGeometry args={[2.7, 0.035, 1.05]} />
        <meshPhysicalMaterial color="#c5d2e8" metalness={0.88} roughness={0.2} clearcoat={0.4} />
      </mesh>
      <mesh rotation={[1.22, 0.18, 0.42]} position={[0.12, 0.08, -0.2]}>
        <torusGeometry args={[1.62, 0.012, 20, 160]} />
        <meshStandardMaterial color="#d5def2" metalness={1} roughness={0.18} />
      </mesh>
      <mesh position={[1.15, 1.05, 0.2]} rotation={[0.35, 0.15, 0.65]}>
        <boxGeometry args={[0.55, 0.02, 0.18]} />
        <meshStandardMaterial color={palette.accent2} emissive={palette.accent2} emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function Scene({ pointer, palette }: { pointer: RefObject<{ x: number; y: number }>; palette: Palette }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-3.5, 4.2, 3.5]} intensity={3.4} color={palette.paper} />
      <directionalLight position={[3.2, 1.2, 2]} intensity={1.1} color={palette.accent} />
      <pointLight position={[-1.6, 0.4, 1.8]} intensity={18} distance={8} color={palette.accent} />
      <pointLight position={[1.8, -0.4, 1.4]} intensity={2.2} distance={7} color={palette.accent2} />
      <Environment resolution={128} frames={1} environmentIntensity={1}>
        <Lightformer form="rect" intensity={3} position={[-2, 2.4, 2]} scale={[5, 2.2, 1]} color={palette.paper} />
        <Lightformer form="rect" intensity={8} position={[-2.2, 0.2, 1.6]} scale={[0.35, 4.2, 1]} color={palette.accent} />
        <Lightformer form="rect" intensity={0.8} position={[2.4, -0.8, -1]} scale={[2, 1.4, 1]} color={palette.accent2} />
      </Environment>
      <Fold pointer={pointer} palette={palette} />
    </>
  );
}

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <SculptureFallback />;
    return this.props.children;
  }
}

export default function Sculpture({ active }: { active: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const palette = usePalette();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    renderer.current?.setClearColor(palette.ink, 1);
  }, [palette.ink]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Boundary>
      <div className="absolute inset-0">
        {ready ? null : <SculptureFallback />}
        <Canvas
          camera={{ position: [-0.15, 0.18, 5.15], fov: 28 }}
          dpr={[1, 1.5]}
          frameloop={active ? "always" : "never"}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
          }}
          style={{ position: "absolute", inset: 0, opacity: ready ? 1 : 0 }}
          onCreated={({ gl }) => {
            renderer.current = gl;
            gl.setClearColor(palette.ink, 1);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.16;
            setReady(true);
          }}
        >
          <Scene pointer={pointer} palette={palette} />
        </Canvas>
      </div>
    </Boundary>
  );
}
