import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarFieldProps {
  count: number;
  spread?: number;
}

/**
 * StarField
 * A BufferGeometry Points cloud. Every star gets a random luminance value
 * stored in a Float32Array attribute; the vertex shader scales gl_PointSize
 * by it so stars have natural size variation. A uniform `uTime` drives a
 * per-star twinkle via a low-frequency sin offset seeded by position.
 *
 * Source: scene.html camera/renderer constants (fov 45, far 100, dpr clamp).
 */

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    // Twinkle: slow sin wave offset by per-star seed
    float twinkle = 0.75 + 0.25 * sin(uTime * 0.8 + aSeed * 6.2831);
    vAlpha = twinkle;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * twinkle * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vAlpha;

  void main() {
    // Circular point with soft edge
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float alpha = (1.0 - smoothstep(0.35, 0.5, dist)) * vAlpha;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.9);
  }
`;

export function StarField({ count, spread = 80 }: StarFieldProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const [positions, sizes, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const sd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a sphere, avoid dead-center cluster
      const r = 20 + Math.random() * spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sz[i] = 0.4 + Math.random() * 1.1;  // size variance
      sd[i] = Math.random() * 100;         // twinkle seed
    }
    return [pos, sz, sd];
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize"    args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSeed"    args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
