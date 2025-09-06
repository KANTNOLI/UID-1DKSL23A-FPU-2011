'use client'

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface position {
    z: number;
    y: number;
}

interface CartProps {
    texts: texts,
    width?: number | string;
    height?: number | string;
    position?: position;
}

interface position {
    x: number,
    y: number,
    z: number,
}

interface sizes {
    w: number,
    h: number,
}

interface text {
    text: string,
    pos: position,
    sizes: sizes,
}

interface texts {
    title: text,
    price: text,
    desc1: text,
    desc2: text,
    desc3: text,
    select: text,
}

const Cart: React.FC<CartProps> = ({
    width = '100%',
    height = '100%',
    position = { y: 0, z: 2 },
    texts,
}) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!mountRef.current) return;

        // Инициализация
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = position.z;
        camera.position.y = position.y;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true // Прозрачный фон
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setClearColor(0x000000, 0); // Полностью прозрачный фон
        mountRef.current.appendChild(renderer.domElement);

        // Создаем плоскость с эффектом стекла
        const planeWidth = 2.2;
        const planeHeight = 3.2;
        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

        // Создаем кастомный шейдерный материал для эффекта стекла
        const glassMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                resolution: {
                    value: new THREE.Vector2(
                        mountRef.current.clientWidth,
                        mountRef.current.clientHeight
                    )
                }
            },
            vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
            fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    void main() {
      // Более темный базовый цвет стекла с повышенной прозрачностью
      vec4 glassColor = vec4(0.4, 0.5, 0.6, 0.5);
      
      // Увеличиваем амплитуду искажения для более заметного эффекта
      vec2 distortedUv = vUv + sin(vUv.y * 8.0 + time * 0.7) * 0.03;
      
      // Увеличиваем размытие
      float blur = 0.09; // Увеличено с 0.005
      vec4 color = vec4(0.0);
      float total = 0.0;
      
      // Увеличиваем радиус размытия
      for (float x = -6.0; x <= 6.0; x += 1.0) {
        for (float y = -6.0; y <= 6.0; y += 1.0) {
          vec2 offset = vec2(x, y) * blur;
          color += glassColor;
          total += 1.1;
        }
      }
      
      color /= total;
      
      // Добавляем более выраженные блики
      float shine = sin(vUv.x * 4.0 + time * 1.5) * 0.15 + 0.85;
      color.rgb *= shine;
      
      // Добавляем легкий градиент для эффекта толщины стекла
      float gradient = mix(0.2, 1.0, vUv.y);
      color.rgb *= gradient;
      
      // Делаем цвет еще темнее
      color.rgb *= 1.0;
      
      gl_FragColor = color;
       }
       `,
            transparent: true,
            side: THREE.DoubleSide
        });


        const plane = new THREE.Mesh(geometry, glassMaterial);
        scene.add(plane);


        //
        //
        //
        //

        // Функция для создания текстовой текстуры
        const createTextTexture = (
            text: string,
            fontFamily: string,
            fontSize: number,
            color: string,
            bgColor: string = 'rgba(0,0,0,0)',
            n: string,
        ): THREE.Texture | null => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (!context) return null;

            // Рассчитываем размер canvas
            const padding = 20;
            context.font = `${n} ${fontSize}px ${fontFamily}`;
            const textWidth = Math.min(context.measureText(text).width + padding * 2, planeWidth * 150);
            const textHeight = fontSize + padding * 2;

            canvas.width = textWidth;
            canvas.height = textHeight;

            // Заполняем фон
            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Рисуем текст
            context.font = `${n} ${fontSize}px ${fontFamily}`;
            context.fillStyle = color;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, canvas.width / 2, canvas.height / 2);

            // Создаем текстуру
            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            return texture;
        };

        //
        // M_PLUS_1
        // Khula 
        // Paytone_One



        // 
        const texture1 = createTextTexture(
            texts.title.text,
            "Khula",
            64,
            "#ffffffbe",
            'rgba(0,0,0,0.0)',
            "800"
        );
        if (texture1) {
            const textGeometry1 = new THREE.PlaneGeometry(texts.title.sizes.w, texts.title.sizes.h);
            const textMaterial1 = new THREE.MeshBasicMaterial({
                map: texture1,
                transparent: true,
                side: THREE.DoubleSide
            });

            const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
            textMesh1.position.set(texts.title.pos.x, texts.title.pos.y, texts.title.pos.z);
            scene.add(textMesh1);
        }

        // 
        const texture2 = createTextTexture(
            texts.price.text,
            "M_PLUS_1",
            90,
            "#ffffffd3",
            'rgba(0,0,0,0.0)',
            "bold"
        );
        if (texture2) {
            const textGeometry2 = new THREE.PlaneGeometry(texts.price.sizes.w, texts.price.sizes.h);
            const textMaterial2 = new THREE.MeshBasicMaterial({
                map: texture2,
                transparent: true,
                side: THREE.DoubleSide
            });

            const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
            textMesh2.position.set(texts.price.pos.x, texts.price.pos.y, texts.price.pos.z);
            scene.add(textMesh2);
        }


        // 
        const texture3 = createTextTexture(
            texts.select.text,
            "Khula",
            48,
            "#ffffffd3",
            'rgba(0,0,0,0.0)',
            "bold"
        );
        if (texture3) {
            const textGeometry3 = new THREE.PlaneGeometry(texts.select.sizes.w, texts.select.sizes.h);
            const textMaterial3 = new THREE.MeshBasicMaterial({
                map: texture3,
                transparent: true,
                side: THREE.DoubleSide
            });

            const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial3);
            textMesh3.position.set(texts.select.pos.x, texts.select.pos.y, texts.select.pos.z);
            scene.add(textMesh3);
        }


        // 
        const texture4 = createTextTexture(
            texts.desc1.text,
            "Khula",
            30,
            "#ffffff8d",
            'rgba(255, 0, 0, 0)',
            "bold"
        );
        if (texture4) {
            const textGeometry4 = new THREE.PlaneGeometry(texts.desc1.sizes.w, texts.desc1.sizes.h);
            const textMaterial4 = new THREE.MeshBasicMaterial({
                map: texture4,
                transparent: true,
                side: THREE.DoubleSide
            });

            const textMesh4 = new THREE.Mesh(textGeometry4, textMaterial4);
            textMesh4.position.set(texts.desc1.pos.x, texts.desc1.pos.y, texts.desc1.pos.z);
            scene.add(textMesh4);
        }


        // 
        const texture5 = createTextTexture(
            texts.desc2.text,
            "Khula",
            24,
            "#ffffff8d",
            'rgba(255, 0, 0, 0)',
            "bold"
        );
        if (texture5) {
            const textGeometry5 = new THREE.PlaneGeometry(texts.desc2.sizes.w, texts.desc2.sizes.h);
            const textMaterial5 = new THREE.MeshBasicMaterial({
                map: texture5,
                transparent: true,
                side: THREE.DoubleSide
            });

            const textMesh5 = new THREE.Mesh(textGeometry5, textMaterial5);
            textMesh5.position.set(texts.desc2.pos.x, texts.desc2.pos.y, texts.desc2.pos.z);
            scene.add(textMesh5);
        }

        // 
        const texture6 = createTextTexture(
            texts.desc3.text,
            "Khula",
            28,
            "#ffffff8d",
            'rgba(255, 0, 0, 0)',
            "bold"
        );
        if (texture6) {
            const textGeometry6 = new THREE.PlaneGeometry(texts.desc3.sizes.w, texts.desc3.sizes.h);
            const textMaterial6 = new THREE.MeshBasicMaterial({
                map: texture6,
                transparent: true,
                side: THREE.DoubleSide
            });

            const textMesh6 = new THREE.Mesh(textGeometry6, textMaterial6);
            textMesh6.position.set(texts.desc3.pos.x, texts.desc3.pos.y, texts.desc3.pos.z);
            scene.add(textMesh6);
        }

        //
        //
        //
        //
        //
        //
        //



        // Добавляем источник света для лучшего эффекта
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            // Обновляем время для шейдера
            if (glassMaterial.uniforms.time) {
                glassMaterial.uniforms.time.value = clock.getElapsedTime();
            }

            renderer.render(scene, camera);
        };

        setLoading(false);
        animate();

        // Обработчик изменения размера
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            if (glassMaterial.uniforms.resolution) {
                glassMaterial.uniforms.resolution.value.set(
                    mountRef.current.clientWidth,
                    mountRef.current.clientHeight
                );
            }
        };

        window.addEventListener('resize', handleResize);

        // Очистка
        return () => {
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, [position.y, position.z]);

    return (
        <div
            ref={mountRef}
            style={{
                width,
                height,
                background: 'transparent',
            }}
        >
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    padding: '20px',
                    textAlign: 'center',
                    fontSize: '14px'
                }}>
                    Загрузка...
                </div>
            )}
        </div>
    );
};

export default Cart;