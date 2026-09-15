import { useEffect, useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  particleVertex,
  particleFragment,
  coreVertex,
  coreFragment,
} from './shaders';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/* Points spread evenly over a sphere via the Fibonacci lattice. */
function buildSphereGeometry(count, radius) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    // jitter each radius so the points read as a cloud rather than a hard shell
    const rad = radius * (0.88 + Math.random() * 0.18);

    positions[i * 3] = Math.cos(theta) * r * rad;
    positions[i * 3 + 1] = y * rad;
    positions[i * 3 + 2] = Math.sin(theta) * r * rad;

    scales[i] = 0.4 + Math.random() * 1.3;
    seeds[i] = Math.random();
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  return geo;
}

function useSphereGeometry(count, radius) {
  const geometry = useMemo(() => buildSphereGeometry(count, radius), [count, radius]);

  // free the GPU buffers if the scene ever unmounts
  useEffect(() => () => geometry.dispose(), [geometry]);

  return geometry;
}

function ParticleCloud({ count, reduced, scrollRef }) {
  const matRef = useRef(null);
  const groupRef = useRef(null);
  const pointerTarget = useRef(new THREE.Vector3(0, 0, 3));
  const geometry = useSphereGeometry(count, 2.05);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 22 },
      uPointer: { value: new THREE.Vector3(0, 0, 3) },
      uScrollFade: { value: 0 },
      uColorA: { value: new THREE.Color('#ff6a3d') },
      uColorB: { value: new THREE.Color('#5bc8f5') },
      uOpacity: { value: 1.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const u = matRef.current?.uniforms;
    if (!u) return;

    u.uTime.value = reduced ? 0.4 : t;
    // gl_PointSize is in framebuffer pixels, so fold in the DPR to keep the
    // points the same visual size on retina as on 1x
    u.uSize.value = 22 * state.viewport.dpr;

    // pointer lives on the sphere's front face, in world units
    const { x, y } = state.pointer;
    pointerTarget.current.set((x * viewport.width) / 2.4, (y * viewport.height) / 2.4, 1.6);
    u.uPointer.value.lerp(pointerTarget.current, reduced ? 1 : Math.min(1, delta * 3));

    const scroll = scrollRef.current;
    u.uScrollFade.value += (scroll - u.uScrollFade.value) * Math.min(1, delta * 6);
    u.uOpacity.value = 1.0 * (1 - scroll * 0.9);

    if (groupRef.current && !reduced) {
      groupRef.current.rotation.y += delta * 0.055;
      // subtle parallax tilt following the cursor
      groupRef.current.rotation.x +=
        (-y * 0.22 - groupRef.current.rotation.x) * Math.min(1, delta * 2);
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={particleVertex}
          fragmentShader={particleFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <WireCore reduced={reduced} scrollRef={scrollRef} />
    </group>
  );
}

function WireCore({ reduced, scrollRef }) {
  const matRef = useRef(null);
  const meshRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#ffc24b') },
      uOpacity: { value: 0.13 },
    }),
    []
  );

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms;
    if (u) {
      u.uTime.value = reduced ? 0.4 : state.clock.elapsedTime;
      u.uOpacity.value = 0.13 * (1 - scrollRef.current);
    }
    if (meshRef.current && !reduced) {
      meshRef.current.rotation.y -= delta * 0.1;
      meshRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.25, 4]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={coreVertex}
        fragmentShader={coreFragment}
        wireframe
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* Slow drift of the whole scene so the composition never sits perfectly still. */
function CameraRig({ reduced }) {
  useFrame((state, delta) => {
    if (reduced) return;
    const { x, y } = state.pointer;
    state.camera.position.x += (x * 0.45 - state.camera.position.x) * Math.min(1, delta * 1.5);
    state.camera.position.y += (y * 0.3 - state.camera.position.y) * Math.min(1, delta * 1.5);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ scrollRef }) {
  const reduced = usePrefersReducedMotion();

  // fewer points on phones, and the cloud sits off to one side on wide screens
  // so it frames the headline instead of sitting on top of it
  const { count, offset } = useMemo(() => {
    const narrow = typeof window !== 'undefined' && window.innerWidth < 760;
    return {
      count: narrow ? 3500 : 7000,
      offset: narrow ? [0, 1.1, 0] : [1.85, 0.75, 0],
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <Suspense fallback={null}>
        <group position={offset}>
          <ParticleCloud count={count} reduced={reduced} scrollRef={scrollRef} />
        </group>
        <CameraRig reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
