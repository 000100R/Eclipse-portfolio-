export const duration = {
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
};

export const easing = {
  eclipse: [0.16, 1, 0.3, 1] as const, // cubic-bezier for smooth eclipse entry
  eclipseIn: [0.3, 0, 0.84, 0] as const, // cubic-bezier for smooth exit
  magnetic: [0.25, 1, 0.5, 1] as const, // snappy magnetic spring ease
};

export const zIndex = {
  overlay: 100,
  modal: 200,
};
