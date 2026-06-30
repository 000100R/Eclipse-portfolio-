import { useMemo } from "react";

export type PerformanceTier = "high" | "medium" | "low";

export interface PerformanceTierResult {
  tier: PerformanceTier;
  /** True when the scene should be skipped entirely. */
  disabled: boolean;
  /** Particle count scaled to tier. */
  particleCount: number;
  /** Nebula sample count scaled to tier. */
  nebulaCount: number;
  /** Whether to run the camera drift animation. */
  cameraDrift: boolean;
  /** Max device pixel ratio to use for the renderer. */
  maxDpr: number;
}

/**
 * Heuristic device performance detection.
 *
 * Strategy (evaluated once, never re-runs):
 *   1. navigator.hardwareConcurrency < 4  → low
 *   2. navigator.deviceMemory < 4         → low  (Chrome only; undefined elsewhere)
 *   3. matchMedia("(hover: none)")        → likely mobile touchscreen
 *   4. matchMedia("(prefers-reduced-motion: reduce)") → honour user preference
 *   5. devicePixelRatio > 2               → likely high-DPI mobile, treat as medium
 *
 * "low" tier:  WebGL canvas disabled, static CSS gradient used instead.
 * "medium":    Reduced particle count, no bloom, capped DPR at 1.
 * "high":      Full scene, DPR capped at 2 (from scene.html proto).
 */
export function usePerformanceTier(): PerformanceTierResult {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        tier: "high",
        disabled: false,
        particleCount: 2800,
        nebulaCount: 18,
        cameraDrift: true,
        maxDpr: 2,
      };
    }

    const mq = (q: string) => window.matchMedia(q).matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    // deviceMemory is a non-standard Chrome API; cast to avoid TS error.
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const reducedMotion = mq("(prefers-reduced-motion: reduce)");
    const noHover = mq("(hover: none)");
    const highDpr = window.devicePixelRatio > 2;

    // Hard disable conditions
    if (reducedMotion || cores < 2 || memory < 2) {
      return {
        tier: "low",
        disabled: true,
        particleCount: 0,
        nebulaCount: 0,
        cameraDrift: false,
        maxDpr: 1,
      };
    }

    // Low-end mobile: touch-only devices with limited cores/memory
    if (noHover && (cores < 4 || memory < 4 || highDpr)) {
      return {
        tier: "low",
        disabled: true,
        particleCount: 0,
        nebulaCount: 0,
        cameraDrift: false,
        maxDpr: 1,
      };
    }

    // Medium: laptop/desktop with modest specs, or any mobile that passed above
    if (cores < 6 || memory < 6) {
      return {
        tier: "medium",
        disabled: false,
        particleCount: 1200,
        nebulaCount: 10,
        cameraDrift: true,
        maxDpr: 1,
      };
    }

    // High: capable desktop/laptop
    return {
      tier: "high",
      disabled: false,
      particleCount: 2800,
      nebulaCount: 18,
      cameraDrift: true,
      maxDpr: 2,
    };
  }, []);
}
