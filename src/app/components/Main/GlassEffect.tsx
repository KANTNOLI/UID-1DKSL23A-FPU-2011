import { Canvas } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';

// Объявляем компонент как функцию
function GlassEffect() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.1}
          transmission={1}
          
          chromaticAberration={0.05}
          color="#ffffff"
        />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}

export default GlassEffect;
