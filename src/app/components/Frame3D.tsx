'use client'

import { useRef, useEffect, useState } from 'react'

interface position {
  x: number
  z: number
  y: number
}

interface Frame3DProps {
  width?: number | string
  height?: number | string
  modelPath?: string
  position?: position
}

const Frame3D: React.FC<Frame3DProps> = ({
  width = '100%',
  height = '100%',
  modelPath = '123123',
  position = { x: 0, y: 1.2, z: 2.6 }
}) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!mountRef.current) return

    const initThree = async () => {
      // Динамический импорт Three.js
      const THREE = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, mountRef.current!.clientWidth / mountRef.current!.clientHeight, 0.1, 1000)
      camera.position.z = position.z
      camera.position.y = position.y
      camera.position.x = position.x

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight)
      renderer.setClearColor(0x000000, 0)
      mountRef.current!.appendChild(renderer.domElement)

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
          
          vec3 getGradientColor(float pos) {
            vec3 color1 = vec3(0.733, 0.553, 0.961);
            vec3 color2 = vec3(0.4, 0.2, 0.9);  
            vec3 color3 = vec3(0.2, 0.6, 1.0);
            vec3 color0 = vec3(0.8, 0.3, 0.9);
            
            float p0 = 0.0;
            float p1 = 0.25;
            float p2 = 0.5;
            float p3 = 0.75;
            
            if (pos < p1) {
              return mix(color0, color1, (pos - p0) / (p1 - p0));
            } else if (pos < p2) {
              return mix(color1, color2, (pos - p1) / (p2 - p1));
            } else if (pos < p3) {
              return mix(color2, color3, (pos - p2) / (p3 - p2));
            } else {
              return mix(color3, color0, (pos - p3) / (1.0 - p3));
            }
          }
          
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewDir);
            
            float fresnel = pow(1.0 - abs(dot(normal, viewDir)), fresnelPower);
            float gradientPos = fract(time * 0.05 + vUv.x * 2.0 + vUv.y * 1.5);
            vec3 gradientColor = getGradientColor(gradientPos);
            gradientColor = pow(gradientColor, vec3(2)) * colorIntensity;
            
            vec3 silverBase = vec3(0.9, 0.9, 0.95);
            vec3 color = mix(silverBase, gradientColor, fresnel);
            
            vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
            vec3 halfDir = normalize(lightDir + viewDir);
            float highlight = pow(max(dot(normal, halfDir), 0.0), 32.0) * glossiness;
            color += highlight * vec3(2.0);
            
            color = pow(color, vec3(5.0));
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        transparent: true
      })

      let model: any

      const loader = new GLTFLoader()
      loader.load(modelPath, (gltf) => {
        model = gltf.scene
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.material = hologramShader
          }
        })
        scene.add(model)
        setLoading(false)
      })

      const clock = new THREE.Clock()
      const animate = () => {
        requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()
        hologramShader.uniforms.time.value = elapsedTime

        if (model) {
          model.rotation.y = (elapsedTime + (4.5 * Math.PI)) * 0.15
        }

        renderer.render(scene, camera)
      }
      animate()

      // Функция очистки
      return () => {
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
    }

    // Запускаем инициализацию
    initThree()
  }, [modelPath, position.x, position.y, position.z])

  return (
    <div
      ref={mountRef}
      style={{
        width,
        height,
        background: 'transparent'
      }}
    >
      {loading && (
        <div style={{
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          
        </div>
      )}
    </div>
  )
}

export default Frame3D