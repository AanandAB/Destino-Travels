export const LENIS_CONFIG = {
  duration: 1.4,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
}
