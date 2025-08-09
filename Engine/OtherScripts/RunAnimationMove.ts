/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { PositionObject3D } from "../Constants.interface.js";

export const AnimationMove = (
  object: THREE.Object3D,
  posStart: PositionObject3D = { x: 0, y: 0, z: 0 },
  posEnd: PositionObject3D = { x: 2, y: 1, z: 3 },
  callbackEvenly: (progress: number) => any = () => "",
  callbackClosed: (state: boolean) => any = () => "",
  time: number = 1 // в секундах
) => {
  const startPos = new THREE.Vector3(posStart.x, posStart.y, posStart.z);
  const endPos = new THREE.Vector3(posEnd.x, posEnd.y, posEnd.z);
  const epsilon = 0.001;

  // Плавное ускорение и замедление
  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  let startTime: number | null = null;
  let animationFrameId: number;

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    let progress = Math.min(elapsed / time, 1);
    progress = easeInOutQuad(progress);

    object.position.lerpVectors(startPos, endPos, progress);

    callbackEvenly(progress);

    if (elapsed < time && object.position.distanceTo(endPos) >= epsilon) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      object.position.copy(endPos);
      cancelAnimationFrame(animationFrameId);
      callbackClosed(true);
    }
  };

  animationFrameId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
};

export default AnimationMove;
