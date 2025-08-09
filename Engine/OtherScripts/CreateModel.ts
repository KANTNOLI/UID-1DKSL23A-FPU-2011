/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ModelPosition, ModelShadow } from "./OtherScripts.interface";
import { DEGREE, PositionObject3D } from "../Constants.interface";
// import { CuttingCustomShadowBox } from "../Shaders/Snippets/CuttingCustomShadowBox";
// import { CuttingCustomBox } from "../Shaders/Snippets/CuttingCustomBox";

// где-то в вашем коде, где определяется CustomCube:
export interface CustomCube {
  matrix: THREE.Matrix4 | any;
  // Добавляем опциональное поле texture
  texture?: THREE.Texture | THREE.Material | THREE.Color | null;
  color?: THREE.Color; // если используете явный цвет
  depth: number;
  CoordLT: PositionObject3D;
  CoordLB: PositionObject3D;
  CoordRT: PositionObject3D;
  CoordRB: PositionObject3D;
  startZ: PositionObject3D;
  positionWorld: PositionObject3D;
  endZ: PositionObject3D;
}

export interface Shaders {
  Coords: CustomCube;
  object: THREE.Mesh;
}

export class CreateModel {
  model: THREE.Object3D = new THREE.Object3D();
  modelOriginal: GLTF = {} as GLTF;
  path = "./KGEngine/Models/default.glb";
  position: ModelPosition = {
    posX: 0,
    posY: 0,
    posZ: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleWidth: 1,
    scaleHeight: 1,
    scaleLength: 1,
  };
  shaderFlag: boolean = false;
  shadow: ModelShadow = {
    shadowCasting: true,
    shadowReceiving: true,
  };

  constructor(path: string, position: ModelPosition, shadow: ModelShadow) {
    this.path = path || this.path;
    this.position = { ...this.position, ...position };
    this.shadow = { ...this.shadow, ...shadow };

    // this.modelLoading();
    // this.load
  }

  intervalSnippet(callback: () => any) {
    // Нужно для ожидания загрузки модельки
    // без ожидания функции будут выполняться перед
    // вообще возможностью работать с моделью
    const waitLoading = setInterval(() => {
      if (this.model) {
        callback();
        clearInterval(waitLoading);
      }
    }, 1000);
  }

  setNodeParam(callback: (node: THREE.Mesh) => any) {
    this.intervalSnippet(() => {
      this.model.traverse((node: THREE.Object3D) => {
        if (node instanceof THREE.Mesh) {
          callback(node);
        }
      });
    });
  }


  setCustomNodeParam(callback: (node: any) => any) {
    this.intervalSnippet(() => {
      this.model.traverse((node) => {
        callback(node);
      });
    });
  }

  async modelLoading(loading?: (progress: any) => any): Promise<void> {
    return new Promise((resolve, reject) => {
      const modelsLoader = new GLTFLoader();

      modelsLoader.load(
        this.path,
        (model: GLTF) => {
          try {
            this.model = model.scene;
            this.modelOriginal = model;

            if (!this.model) {
              throw new Error("Failed to load model");
            }

            // Настройка позиции, вращения и масштаба
            this.model.position.set(
              this.position.posX,
              this.position.posY,
              this.position.posZ
            );

            this.model.rotation.set(
              (this.position.rotateX || 0) * DEGREE,
              (this.position.rotateY || 0) * DEGREE,
              (this.position.rotateZ || 0) * DEGREE
            );

            this.model.scale.set(
              this.position.scaleWidth || 1,
              this.position.scaleHeight || 1,
              this.position.scaleLength || 1
            );

            // Настройка теней
            this.setNodeParam((node: THREE.Mesh) => {
              node.castShadow =
                this.shadow.shadowCasting !== undefined
                  ? this.shadow.shadowCasting
                  : true;
              node.receiveShadow =
                this.shadow.shadowReceiving !== undefined
                  ? this.shadow.shadowReceiving
                  : true;
            });

            resolve(); // Успешная загрузка
          } catch (error) {
            console.error("Error processing model:", error);
            reject(error);
          }
        },
        (progress) => {
          if (loading) {
            loading(progress);
          }
        },
        (error) => {
          console.error("Error loading model:", error);
          reject(error);
        }
      );
    });
  }

  addToScene(scene: THREE.Scene) {
    this.intervalSnippet(() => {
      scene.add(this.model);
    });
  }

  customEdit(callback: (model: THREE.Object3D) => any) {
    this.intervalSnippet(() => {
      callback(this.model);
    });
  }

  customEditOriginal(callback: (model: GLTF) => any) {
    this.intervalSnippet(() => {
      callback(this.modelOriginal);
    });
  }

  updatePosition(position: ModelPosition) {
    this.position = { ...this.position, ...position };

    this.intervalSnippet(() => {
      this.model.position.x = this.position.posX;
      this.model.position.y = this.position.posY;
      this.model.position.z = this.position.posZ;

      this.model.rotation.x =
        this.position.rotateX != undefined ? DEGREE * this.position.rotateX : 0;
      this.model.rotation.y =
        this.position.rotateY != undefined ? DEGREE * this.position.rotateY : 0;
      this.model.rotation.z =
        this.position.rotateZ != undefined ? DEGREE * this.position.rotateZ : 0;

      this.model.scale.set(
        this.position.scaleWidth || 1,
        this.position.scaleHeight || 1,
        this.position.scaleLength || 1
      );
    });
  }

  switchingShadow() {
    this.setNodeParam((node) => {
      node.castShadow = !this.shadow.shadowCasting;
      node.receiveShadow = !this.shadow.shadowReceiving;
    });
  }
}
