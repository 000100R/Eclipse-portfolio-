import { Suspense } from "react";
import { StarField }    from "./StarField";
import { NebulaCloud }  from "./NebulaCloud";
import { BlueCoreGlow } from "./BlueCoreGlow";
import { CameraRig }    from "./CameraRig";
import type { PerformanceTierResult } from "../../hooks/usePerformanceTier";

interface SceneContentProps {
  perf: PerformanceTierResult;
  scrollProgress: number;
}

/**
 * SceneContent
 * The actual R3F scene graph. Kept separate from the Canvas wrapper so it
 * can be wrapped in <Suspense> without losing the Canvas context, and so
 * the wrapper can conditionally render without touching the R3F tree.
 *
 * Lighting hierarchy mirrors scene.html:
 *   - AmbientLight  0.02 intensity  (barely-there fill)
 *   - BlueCoreGlow  PointLight      (primary atmosphere source)
 *
 * No DirectionalLight — we don't want hard shadows in a space scene.
 */
export function SceneContent({ perf, scrollProgress }: SceneContentProps) {
  return (
    <Suspense fallback={null}>
      {/* Minimal ambient fill — keeps deep-space areas from being pure #000 */}
      <ambientLight intensity={0.018} color="#050a18" />

      {/* Electric-blue atmospheric core */}
      <BlueCoreGlow />

      {/* Volumetric nebula layers */}
      <NebulaCloud count={perf.nebulaCount} />

      {/* Star field */}
      <StarField count={perf.particleCount} />

      {/* Camera controller — null render, drives camera only */}
      {perf.cameraDrift && (
        <CameraRig
          parallaxStrength={0.3}
          driftStrength={0.1}
          scrollProgress={scrollProgress}
        />
      )}
    </Suspense>
  );
}
