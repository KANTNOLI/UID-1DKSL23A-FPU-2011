"use clinet";

import { WebGLEngine } from "../../../../Engine/VisualEngineConfigs/WebGLEngine";
import { DefaultCameraSettings } from "../../../../Engine/Cameras/DefaultCameraSettings";
import { CreateScene } from "../../../../Engine/OtherScripts/CreateScene";
import CustomObject from "../../../../Engine/Objects/Snippets/CustomObject";
import { BoxGeometry } from "../../../../Engine/Objects/Geometry/BoxGeometry";
import { BasicMaterial } from "../../../../Engine/Objects/Materials/BasicMaterial";

interface props {
  canvas: HTMLDivElement;
  height: number;
  width: number;
}

function Frame3D({ canvas, width, height }: props) {
  const scene = new CreateScene();
  scene.scene.background = null;

  const renderer = WebGLEngine({}, { height, width });
  renderer.setClearColor(0x000000, 0);

  const cube = CustomObject(BoxGeometry(), BasicMaterial({ color: 0xff0000 }));
  scene.addScene(cube);

  const camera = DefaultCameraSettings(
    { x: 1, y: 1, z: 2 },
    { aspect: width / height }
  );
  camera.lookAt(cube.position);

  canvas.appendChild(renderer.domElement);

  const animate = () => {
    console.log(123);

    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    cube.rotation.x += 0.01;

    renderer.render(scene.scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
}

export default Frame3D;
