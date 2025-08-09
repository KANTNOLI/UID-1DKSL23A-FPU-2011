/* eslint-disable @typescript-eslint/no-explicit-any */

export const AnimationCustom = (
  callbackEvenly: (progress: number) => any,
  callbackClosed: (state: boolean) => any = () => "",
  time: number = 1
) => {
  const epsilon = 0.001;
  let startTime: number | null = null;
  let animationFrameId: number;

  // Плавное ускорение и замедление
  const easeInOutQuad = (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animate = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    let progress = Math.min(elapsed / time, 1);
    progress = easeInOutQuad(progress);

    callbackEvenly(progress);

    if (progress < 1 - epsilon) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      callbackEvenly(1);
      callbackClosed(true);
    }
  };

  animationFrameId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
};

export default AnimationCustom;
