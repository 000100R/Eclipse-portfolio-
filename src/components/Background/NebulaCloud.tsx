import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NebulaCloudProps {
  count: number;
}

/**
 * NebulaCloud
 * Each nebula layer is a large transparent disc (PlaneGeometry) with a
 * radial-gradient canvas texture baked once and reused across all instances.
 * The gradient uses the Eclipse electric-blue accent (#3b82ff → transparent)
 * for the primary cloud mass, with a thin gold ring at the perimeter to pick
 * up the portfolio's accent pair.
 *
 * Drift: each mesh has a randomised drift axis and speed stored at creation
 * time in userData. useFrame rotates each mesh around its own axis so the
 * cloud appears to slowly breathe.
 */

function makeGradientTexture(
  primaryColor: string,
  accentColor: string
): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const cx = size / 2;
  const r0 = size * 0.05;
  const r1 = size * 0.5;

  // Core glow
  const grad = ctx.createRadialGradient(cx, cx, r0, cx, cx, r1);
  grad.addColorStop(0,    primaryColor.replace(")", ", 0.18)").replace("rgb", "rgba").replace("#", "rgba(").replace("rgba(", "rgba(") );
  grad.addColorStop(0.35, primaryColor.replace(")", ", 0.09)").replace("rgb", "rgba"));
  grad.addColorStop(0.7,  accentColor.replace(")", ", 0.03)").replace("rgb", "rgba"));
  grad.addColorStop(1,    "rgba(0,0,0,0)");

  // Recalculate with hex colors properly
  const coreGrad = ctx.createRadialGradient(cx, cx, r0, cx, cx, r1);
  coreGrad.addColorStop(0,    "rgba(59, 130, 255, 0.20)");
  coreGrad.addColorStop(0.3,  "rgba(30,  58, 110, 0.12)");
  coreGrad.addColorStop(0.65, "rgba(212,175,  55, 0.04)");
  coreGrad.addColorStop(1,    "rgba(0,   0,   0,  0)");

  ctx.fillStyle = coreGrad;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

export function NebulaCloud({ count }: NebulaCloudProps) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const texture = useMemo(
    () => makeGradientTexture("#3b82ff", "#d4af37"),
    []
  );

  const clouds = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const radius = 6 + Math.random() * 18;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.acos(2 * Math.random() - 1);

      return {
        id: i,
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          -5 - Math.random() * 20
        ),
        scale:     8 + Math.random() * 14,
        rotationZ: Math.random() * Math.PI * 2,
        driftSpeed: 0.008 + Math.random() * 0.012,
        driftAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
        opacity: 0.35 + Math.random() * 0.45,
      };
    });
  }, [count]);

  useFrame((_, delta) => {
    clouds.forEach((cloud, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      mesh.rotateOnAxis(cloud.driftAxis, cloud.driftSpeed * delta);
    });
  });

  return (
    <group>
      {clouds.map((cloud, i) => (
        <mesh
          key={cloud.id}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={cloud.position}
          rotation={[0, 0, cloud.rotationZ]}
          scale={cloud.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={cloud.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
