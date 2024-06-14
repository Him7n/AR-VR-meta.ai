import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import XrCube from './XrCube';
export default function XrContainer() {




    return (
        <>
            <ARButton />
            <Canvas style={{ width: '300px', height: '200px' }} >
                <XR>
                    <XrCube />
                </XR>
            </Canvas >
        </>
    )
}