import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function TorusCore({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Smooth auto-rotation + mouse responsiveness
      const targetRotationX = t * 0.25 + mousePos.current.y * 0.8;
      const targetRotationY = t * 0.35 + mousePos.current.x * 0.8;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.15;
      outerRingRef.current.rotation.z = t * 0.2 + mousePos.current.x * 0.3;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.3;
      innerRingRef.current.rotation.z = -t * 0.15 + mousePos.current.y * 0.3;
    }
  });

  return (
    <group scale={1.15}>
      {/* Central dimensional distorted geometric core */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.3, 3]} />
          <MeshDistortMaterial
            color="#2563eb"
            emissive="#1e1b4b"
            roughness={0.15}
            metalness={0.9}
            distort={0.35}
            speed={2.2}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Floating Wireframe Torus Ring (Horizontal) */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.0, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Floating Wireframe Torus Ring (Tilted) */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.3, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.9}
          wireframe
        />
      </mesh>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-6, -6, 2]} intensity={2.5} color="#3b82f6" />
      <pointLight position={[6, 6, 2]} intensity={2.5} color="#a855f7" />
      <pointLight position={[0, 4, 3]} intensity={2.0} color="#06b6d4" />
    </>
  );
}

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('WebGL / Three.js fallback active:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function HeroScene3D() {
  const mousePos = useRef({ x: 0, y: 0 });
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1;
    const y = -(((clientY - top) / height) * 2 - 1);
    mousePos.current = { x, y };
  };

  const fallbackVisual = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-purple-500/30 blur-2xl animate-pulse" />
    </div>
  );

  if (!isWebGLSupported) {
    return fallbackVisual;
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className="w-full h-full relative"
      aria-hidden="true"
    >
      <WebGLErrorBoundary fallback={fallbackVisual}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
          className="pointer-events-none"
        >
          <SceneLights />
          <Sparkles count={40} scale={6} size={2.5} speed={0.4} opacity={0.6} color="#06b6d4" />
          <TorusCore mousePos={mousePos} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

