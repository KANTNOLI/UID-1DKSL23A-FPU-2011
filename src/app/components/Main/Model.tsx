'use client';
import React, { useRef } from 'react';
import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three'; 

export default function Model() {
    const { nodes } = useGLTF("./123.glb");
    const { viewport } = useThree();
    const torus = useRef<THREE.Mesh>(null!);

    // Настройки материала через leva
    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },
        color: '#ffffff',
    });

    // Анимация вращения
    useFrame(() => {
        if (torus.current) {
            torus.current.rotation.x += 0.02;
        }
    });

    return (
        <group scale={viewport.width / 3.75}>
            <Text
                // font={'/fonts/PPNeueMontreal-Bold.otf'}
                position={[0, 0, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                hello world!
            </Text>
            <mesh  ref={torus} {...nodes.Torus002}>
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
        </group>
    );
}
