import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneContent } from "./SceneContent";
import { usePerformanceTier } from "../../hooks/usePerformanceTier";

interface SpaceBackgroundProps {
  /**
   * Scroll progress [0, 1] fed in from a parent hook (useScrollProgress).
   * Used by CameraRig to pull the camera back as the user scrolls down.
   * Defaults to 0 if not provided.
   */
  scrollProgress?: number;
}

/**
 * SpaceBackground
 * Drop into App.tsx once, above <main>. Renders a fixed, full-viewport
 * Three.js canvas that sits behind all page content (z-index: var(--z-behind)).
 *
 * Performance strategy:
 *   - usePerformanceTier() heuristic: disabled entirely on low-end / mobile.
 *   - IntersectionObserver: pauses the render loop when the document is not
 *     visible (tab switch) via the `frameloop` prop on <Canvas>.
 *   - dpr capped at tier.maxDpr (1 for medium, 2 for high — mirrors scene.html).
 *   - No postprocessing (bloom, SMAA etc) — all glow is shader/blending tricks
 *     so the cost is just geometry + per-fragment blending.
 *
 * Fallback (low-end / no WebGL):
 *   A static CSS radial-gradient that matches the visual intent without
 *   any GPU load. Same background color (#050505) and a dim blue glow at
 *   the centre so the page doesn't look broken.
 */
export function SpaceBackground({ scrollProgress = 0 }: SpaceBackgroundProps) {
  const perf        = usePerformanceTier();
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Pause render loop when tab is hidden or element is off-screen.
  useEffect(() => {
    if (perf.disabled) return;

    const handleVisibility = () => {
      setPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [perf.disabled]);

  // ── Fallback for low-end / reduced-motion devices ────────────────────────
  if (perf.disabled) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: "var(--z-behind)" as unknown as number,
          background: `
            radial-gradient(ellipse 60% 50% at 50% 45%, rgba(30,58,110,0.28) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 30% 70%, rgba(59,130,255,0.06) 0%, transparent 60%),
            #050505
          `,
          pointerEvents: "none",
        }}
      />
    );
  }

  // ── Full WebGL canvas ─────────────────────────────────────────────────────
  return (
    <div
      ref={wrapperRef}
      id="scene-container"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-behind)" as unknown as number,
        pointerEvents: "none",
        background: "#050505",  // instant paint while canvas initialises
      }}
    >
      <Canvas
        frameloop={paused ? "never" : "always"}
        dpr={[1, perf.maxDpr]}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 5] }}
        gl={{
          antialias: false,       // off — our geometry is too fine for MSAA to help
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <SceneContent perf={perf} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

export default SpaceBackground;
