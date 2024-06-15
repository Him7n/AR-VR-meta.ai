import React from 'react'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
const XrCube = () => {
    const cubeRef = useRef();

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;
    });
    return (

        <>
            <OrbitControls />
            <ambientLight />
            <mesh ref={cubeRef} scale={1} >
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={"mediumpurple"} />
            </mesh>

        </>
    )
}

export default XrCube