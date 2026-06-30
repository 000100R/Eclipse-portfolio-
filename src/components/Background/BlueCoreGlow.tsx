import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * BlueCoreGlow
 * A softly pulsing emissive sphere + a PointLight, centred near the origin
 * and pushed back along Z so it sits behind all nebula layers. This is the
 * primary source of the "electric blue ambient" atmosphere.
 *
 * The pulse is a slow sin wave on the material emissiveIntensity and the
 * PointLight intensity — cheap and GPU-free (just a uniform update per frame).
 */
export function BlueCoreGlow() {
  const meshRef  = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const matRef   = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t     = clock.elapsedTime;
    const pulse = 0.7 + 0.3 * Math.sin(t * 0.6);

    if (matRef.current)  matRef.current.emissiveIntensity = pulse * 1.2;
    if (lightRef.current) lightRef.current.intensity      = pulse * 1.8;
  });

  return (
    <group position={[0, 0, -12]}>
      {/* Soft point light — illuminates nebula planes */}
      <pointLight
        ref={lightRef}
        color="#3b82ff"
        intensity={1.8}
        distance={55}
        decay={2}
      />

      {/* Emissive sphere — the actual visible glow source */}
      <mesh ref={meshRef} scale={2.4}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          ref={matRef}
          color="#1e3a6e"
          emissive="#3b82ff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary outer halo — larger, almost invisible */}
      <mesh scale={5.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#3b82ff"
          transparent
          opacity={0.022}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
