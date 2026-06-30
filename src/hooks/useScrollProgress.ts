import { useEffect, useState } from "react";

/**
 * useScrollProgress
 * Returns the current vertical scroll position as a normalised value [0, 1].
 * 0 = top of page, 1 = bottom of page.
 *
 * Used by SpaceBackground's CameraRig to pull the camera back as the user
 * scrolls down, creating a "receding into space" parallax.
 *
 * Passive listener — never blocks scroll. Debounced to rAF so it doesn't
 * drive React re-renders faster than the display refresh rate.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const value      = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // set initial value

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}
