import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  /** Multiplier for mouse parallax strength (0 = no parallax). */
  parallaxStrength?: number;
  /** Multiplier for the slow autonomous drift. */
  driftStrength?: number;
  /** Scroll position [0, 1] from the parent; drives Z pull-back. */
  scrollProgress?: number;
}

const _target   = new THREE.Vector3();
const _mouse    = new THREE.Vector2();

/**
 * CameraRig
 * Drives the camera with three layered motions:
 *
 *  1. Autonomous drift — very slow Lissajous-like sin/cos path so the scene
 *     never looks frozen even without user interaction.
 *  2. Mouse parallax — pointer position biases the camera look-target,
 *     creating a depth impression as scene layers shift at different rates.
 *  3. Scroll pull-back — increases camera Z as the user scrolls down,
 *     giving a gentle "zooming out into space" feel between sections.
 *
 * All motions use lerp (or exponential decay) so they stay smooth at any
 * frame rate. No spring library needed — camera position is not spring
 * enough to need overshoot.
 */
export function CameraRig({
  parallaxStrength = 0.35,
  driftStrength    = 0.12,
  scrollProgress   = 0,
}: CameraRigProps) {
  const { camera } = useThree();
  const mouseRef = useRef<THREE.Vector2>(_mouse.clone());

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.set(
        (e.clientX / window.innerWidth)  * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // 1. Autonomous drift: small Lissajous arc
    const driftX = Math.sin(t * 0.07) * driftStrength;
    const driftY = Math.cos(t * 0.05) * driftStrength * 0.6;

    // 2. Mouse parallax bias
    const mx = mouseRef.current.x * parallaxStrength;
    const my = mouseRef.current.y * parallaxStrength * 0.6;

    // 3. Scroll pull-back: camera retreats along Z as page scrolls
    const zBase  = 5;
    const zScroll = scrollProgress * 3.5;

    _target.set(driftX + mx, driftY + my, zBase + zScroll);

    // Exponential ease-toward — same pattern as scene.html's animate loop
    camera.position.lerp(_target, 0.025);

    // Keep the camera looking at the origin so the scene doesn't drift off-axis
    camera.lookAt(0, 0, 0);
  });

  return null;
}
