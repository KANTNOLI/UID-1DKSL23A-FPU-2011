import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface Frame3DProps {
  width?: number | string;
  height?: number | string;
  modelPath?: string;
}

const Frame3D: React.FC<Frame3DProps> = ({
  width = '100%',
  height = '100%',
  modelPath = '123123'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Инициализация
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 2.6;
    camera.position.y = 1.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true // Прозрачный фон
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Полностью прозрачный фон
    mountRef.current.appendChild(renderer.domElement);

    // Освещение
    // const light = new THREE.DirectionalLight(0xffffff, 0);
    // light.position.set(1, 1, 1);
    // scene.add(light);
    // scene.add(new THREE.AmbientLight(0x404040));






    const hologramShader = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        fresnelPower: { value: 2.5 },
        colorIntensity: { value: 1.2 },
        glossiness: { value: 0.8 }
      },
      vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDir = -viewPosition.xyz;
      
      gl_Position = projectionMatrix * viewPosition;
    }
  `,
      fragmentShader: `
    uniform float time;
    uniform float fresnelPower;
    uniform float colorIntensity;
    uniform float glossiness;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    
    // Функция для получения цвета из градиента на основе позиции
    vec3 getGradientColor(float pos) {
      // Цвета из предоставленной палитры
      vec3 color0 = vec3(1.0, 0.705, 0.968);    // #FFB4F7
      vec3 color1 = vec3(1.0, 0.816, 0.875);    // #FFD0DF
      vec3 color2 = vec3(1.0, 0.925, 0.776);    // #FFECC6
      vec3 color3 = vec3(1.0, 0.619, 0.925);    // #FF9EEC 
      vec3 color4 = vec3(0.733, 0.553, 0.961);  // #BB8DF5
      vec3 color5 = vec3(0.745, 0.678, 1.0);    // #BEADFF
      vec3 color6 = vec3(0.812, 0.553, 0.992);  // #CF8DFD
      vec3 color7 = vec3(1.0, 0.494, 0.964);    // #FF7EF6
      
      // Позиции цветов в градиенте
      float p0 = 0.0;
      float p1 = 0.13;
      float p2 = 0.24;
      float p3 = 0.38;
      float p4 = 0.51;
      float p5 = 0.67;
      float p6 = 0.84;
      float p7 = 0.93;
      
      // Интерполяция между цветами
      if (pos < p1) {
        return mix(color0, color1, (pos - p0) / (p1 - p0));
      } else if (pos < p2) {
        return mix(color1, color2, (pos - p1) / (p2 - p1));
      } else if (pos < p3) {
        return mix(color2, color3, (pos - p2) / (p3 - p2));
      } else if (pos < p4) {
        return mix(color3, color4, (pos - p3) / (p4 - p3));
      } else if (pos < p5) {
        return mix(color4, color5, (pos - p4) / (p5 - p4));
      } else if (pos < p6) {
        return mix(color5, color6, (pos - p5) / (p6 - p5));
      } else if (pos < p7) {
        return mix(color6, color7, (pos - p6) / (p7 - p6));
      } else {
        return mix(color7, color0, (pos - p7) / (1.0 - p7));
      }
    }
    
    void main() {
      // Нормализуем векторы
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewDir);
      
      // Френелевский эффект
      float fresnel = pow(1.0 - abs(dot(normal, viewDir)), fresnelPower);
      
      // Получаем позицию в градиенте на основе времени и UV координат
      float gradientPos = fract(time * 0.3 + vUv.x * 2.0 + vUv.y * 1.5);
      
      // Получаем цвет из градиента
      vec3 gradientColor = getGradientColor(gradientPos);
      
      // Усиливаем цвета
      gradientColor = pow(gradientColor, vec3(2)) * colorIntensity;
      
      // Серебристая основа
      vec3 silverBase = vec3(0.9, 0.9, 0.95);
      
      // Смешиваем серебристую основу с градиентными цветами
      vec3 color = mix(silverBase, gradientColor, fresnel);
      
      // Добавляем блики
      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
      vec3 halfDir = normalize(lightDir + viewDir);
      float highlight = pow(max(dot(normal, halfDir), 0.0), 32.0) * glossiness;
      color += highlight * vec3(2.0);
      
      // Повышаем контрастность
      color = pow(color, vec3(3.5));
      
      // Финальный цвет без прозрачности
      gl_FragColor = vec4(color, ${1.0});
    }
  `, transparent: true
    });





    let model: THREE.Group;

    // Загрузка модели
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      model = gltf.scene;
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = hologramShader;
        }
      });
      scene.add(model);
      setLoading(false);
    });

    // Анимация
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      hologramShader.uniforms.time.value = elapsedTime;

      // Медленное вращение модели вправо
      if (model) {
        model.rotation.y = elapsedTime * 0.3; // Медленное вращение
      }

      renderer.render(scene, camera);
    };
    animate();

    // Очистка
    return () => {
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  return (
    <div
      ref={mountRef}
      style={{
        width,
        height,
        background: 'transparent' // Прозрачный фон
      }}
    >
      {loading && (
        <div style={{
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          Loading
        </div>
      )}
    </div>
  );
};

export default Frame3D;