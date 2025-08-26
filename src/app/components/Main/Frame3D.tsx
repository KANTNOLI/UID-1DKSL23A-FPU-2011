'use client';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// Объявляем глобальные JSX элементы ДО создания материала
declare global {
  namespace JSX {
    interface IntrinsicElements {
      oilSlickMaterial: any;
    }
  }
}

// Создаем кастомный шейдерный материал для эффекта бензинового пятна
const OilSlickMaterial = shaderMaterial(
  {
    time: 0,
  },
  // Вершинный шейдер
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Фрагментный шейдер - улучшенная версия для бензинового эффекта
  `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  // Функция для создания шума
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Функция для создания плавного шума
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), 
                   hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), 
                   hash(i + vec2(1.0,1.0)), u.x), u.y);
  }

  // Функция для создания фрактального шума
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // Создаем волнообразные искажения для эффекта жидкости
    vec2 center = vUv - 0.5;
    float angle = atan(center.y, center.x);
    float radius = length(center);
    
    // Создаем интерференционные узоры как у бензинового пятна
    float interference = sin(radius * 20.0 - time * 2.0) * 
                         cos(angle * 12.0 + time * 1.5) * 0.5;
    
    // Создаем эффект толщины пленки
    float thickness = fbm(vUv * 2.0 + time * 0.1) + interference * 0.3;
    
    // Основной цветовой сдвиг на основе толщины пленки и угла
    float colorShift = thickness * 5.0 + angle * 2.0 + time * 0.5;
    
    // Создаем радужные цвета с акцентом на синие, фиолетовые и золотые оттенки
    vec3 rainbow = vec3(
        0.6 + 0.4 * sin(colorShift * 3.0),      // Красный/розовый
        0.5 + 0.5 * sin(colorShift * 2.0 + 1.0), // Зеленый/бирюзовый
        0.7 + 0.3 * sin(colorShift * 1.0 + 2.0)  // Синий/фиолетовый
    );
    
    // Добавляем золотистые акценты
    vec3 gold = vec3(1.0, 0.8, 0.3) * (0.5 + 0.5 * sin(colorShift * 0.7));
    rainbow = mix(rainbow, gold, 0.3);
    
    // Добавляем фиолетовые и пурпурные оттенки
    vec3 purple = vec3(0.8, 0.3, 1.0) * (0.5 + 0.5 * cos(colorShift * 0.9 + 1.0));
    rainbow = mix(rainbow, purple, 0.2);
    
    // Создаем эффект свечения
    float glow = pow(1.0 - radius, 2.0) * 0.5;
    rainbow += vec3(0.5, 0.7, 1.0) * glow * 0.3;
    
    // Добавляем блики на основе нормалей
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);
    rainbow += vec3(1.0) * fresnel * 0.5;
    
    // Усиливаем насыщенность
    rainbow = pow(rainbow, vec3(1.5));
    
    // Финальный цвет
    gl_FragColor = vec4(rainbow, 1.0);
  }
  `
);

// Регистрируем материал для использования в JSX
extend({ OilSlickMaterial });

// Тип для рефа материала
interface OilSlickMaterialRef {
  uniforms: {
    time: { value: number };
  };
}

function ModelWithOilSlickEffect() {
  const group = useRef<THREE.Group>(null);
  const materialRef = useRef<OilSlickMaterialRef>(null);
  const { nodes } = useGLTF('./123.glb');

  useFrame(({ clock }) => {
    if (group.current) {
      // Плавное вращение модели
      group.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
    if (materialRef.current) {
      // Обновляем время для шейдера
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  // Функция для применения материала ко всем мешам модели
  const applyMaterial = (node: THREE.Object3D): any => {
    if ((node as THREE.Mesh).isMesh) {
      const mesh = node as THREE.Mesh;
      return (
        <mesh
          key={mesh.uuid}
          geometry={mesh.geometry}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
        >
          {/* @ts-ignore */}
          <oilSlickMaterial ref={materialRef} />
        </mesh>
      );
    }
    
    if (node.children && node.children.length > 0) {
      return (
        <group key={node.uuid}>
          {node.children.map((child: THREE.Object3D) => applyMaterial(child))}
        </group>
      );
    }
    
    return null;
  };

  // Получаем корневой узел модели
  const rootNode = nodes.scene || Object.values(nodes)[0] as THREE.Object3D;

  return (
    <group ref={group}>
      {applyMaterial(rootNode)}
    </group>
  );
}

// Компонент-заглушка для загрузки
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#333333" />
    </mesh>
  );
}

export default function OilSlickModelViewer() {
  return (
    <div style={{ 
      width: '500px', 
      height: '800px',
      background: 'linear-gradient(135deg, #000000, #1a1a2e)',
      overflow: 'hidden',
    }}>
      <Canvas
        camera={{ 
          position: [3, 3, 3], 
          fov: 50,
        }}
        gl={{ 
          antialias: true,
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[2, 5, 3]} 
          intensity={0.8} 
          color="#4a6fc3"
        />
        <pointLight 
          position={[0, 0, 2]} 
          intensity={0.5} 
          color="#ff6b9d"
        />
        
        <Suspense fallback={<Loader />}>
          <ModelWithOilSlickEffect />
        </Suspense>
      </Canvas>
    </div>
  );
}