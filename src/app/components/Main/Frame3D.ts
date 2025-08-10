import * as THREE from "three";
("use clinet");

import { WebGLEngine } from "../../../../Engine/VisualEngineConfigs/WebGLEngine";
import { DefaultCameraSettings } from "../../../../Engine/Cameras/DefaultCameraSettings";
import { CreateScene } from "../../../../Engine/OtherScripts/CreateScene";
import CustomObject from "../../../../Engine/Objects/Snippets/CustomObject";
import { BoxGeometry } from "../../../../Engine/Objects/Geometry/BoxGeometry";
import { BasicMaterial } from "../../../../Engine/Objects/Materials/BasicMaterial";
import { CreateModel } from "../../../../Engine/OtherScripts/CreateModel";
import { DirectionalLightCfg } from "../../../../Engine/Lighting/DirectionalLightCfg";
import { OrbitControl } from "../../../../Engine/PlayerActions/OrbitControl";
import { DEGREE } from "../../../../Engine/Constants.interface";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

interface props {
  canvas: HTMLDivElement;
  height: number;
  width: number;
}

function Frame3D({ canvas, width, height }: props) {
  const scene = new CreateScene();
  scene.scene.background = null;

  const l = DirectionalLightCfg(
    scene.scene,
    { x: 10, y: 10, z: 10 },
    { color: 0xffffff }
  );

  const l2 = DirectionalLightCfg(
    scene.scene,
    { x: -10, y: -10, z: 10 },
    { color: 0x242c4d, intensity: 0.2 }
  );
  scene.addScene([l, l2]);

  const renderer = WebGLEngine({}, { height, width });
  renderer.setClearColor(0x000000, 0);

  const camera = DefaultCameraSettings(
    { x: 0, y: 1, z: 3 },
    { aspect: width / height }
  );

  let loadedModel: THREE.Group;

  canvas.appendChild(renderer.domElement);

  const modelsLoader = new GLTFLoader();
  modelsLoader.load("/main2.glb", (model: GLTF) => {
    if (!model) {
      throw new Error("Failed to load model");
    }
    loadedModel = model.scene;

    scene.addScene(loadedModel);
    scene.scene.lookAt(0, 0, 0);

    // loadedModel.rotation.set(0 * DEGREE, 100 * DEGREE, 0 * DEGREE);
    loadedModel.position.set(0, -1, 0);
  });

  const controls = OrbitControl(renderer, camera, { max: 90, min: 90 });
  controls.maxDistance = 3;
  controls.minDistance = 3;

  const animate = () => {
    console.log(123);

    if (loadedModel) {
      loadedModel.rotation.y += 0.005;
      //   loadedModel.rotation.z += 0.01;
      //   loadedModel.rotation.x += 0.01;
    }

    controls.update();
    renderer.render(scene.scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
}

export default Frame3D;
