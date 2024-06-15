import { OrbitControls, PointerLockControls, useFBO } from '@react-three/drei'
import Lights from './Lights.js'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { useTexture } from '@react-three/drei'
import { MeshReflectorMaterial } from '@react-three/drei'
import Player from './Player.js'
import * as THREE from 'three';
import Player2 from './Player2.js';
import { SocketManager, charactersAtom, socket } from './Socketmanager.js';
import { useFBX } from '@react-three/drei'
import Cordinates from './Utils/Cordinates.js';
import { useAtom } from 'jotai';
import Shop from './Component/Shop.js';
import { useThree } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import Char1 from './Models/Char1.js';
import { P2 } from './Models/P2.js'
import { LowPoly } from './Utils/LowPoly.js'
THREE.ColorManagement.legacyMode = false;




export default function Experience() {
    const [characters] = useAtom(charactersAtom);

    // finding me 
    const character = characters.find((character) => { return character.id == socket.id })

    //----
    // VR
    const { gl, camera } = useThree();
    const xr = useXR();


    const wilow = useFBX('./assets/textures/nature/willow_2.fbx')

    //-- texture

    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTexture([
        './assets/textures/Color.jpg',
        './assets/textures/Displacement.jpg',
        './assets/textures/Normal.jpg',
        './assets/textures/Roughness.jpg',
        './assets/textures/AmbientOcclusion.jpg',
    ])


    // if (xr.isPresenting) {
    //     console.log("XRRR is already present")
    //     // Update camera position in VR mode
    //     camera.position.set(character.position[0], character.position[1], character.position[2]); // Set the desired position
    //     camera.updateMatrixWorld(); // Update the camera's world matrix
    // }

    const { isPresenting, player } = useXR()


    useFrame(() => {

        if (isPresenting) {
            player.position.x = character.position[0] + 0.4
            player.position.y = character.position[1] + 1.2
            player.position.z = character.position[2]


            player.rotation.y = character.rotation
        }

    })
    //--


    // console.log(`my socket id ${socket.id}`)
    // console.log(characters);
    // console.log(characters.length);


    return <>
        {/* <PointerLockControls  /> */}

        {/* <OrbitControls makeDefault /> */}
        <Physics debug gravity={[0, -10, 0]}  >
            <Cordinates />

            <Lights />
            {/* <Char1 /> */}
            {/* <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh> */}
            {/* <P2 /> */}
            {/* <LowPoly /> */}


            {/* <Player/> */}
            <mesh castShadow position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            {/* <P2/> */}

            <Shop />
            <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={80}>
                <planeGeometry />
                <MeshReflectorMaterial

                    // blur={[300, 100]}
                    // resolution={2048}
                    // mixBlur={1}
                    // mixStrength={60}
                    // roughness={1}
                    // depthScale={0}
                    // minDepthThreshold={0.4}
                    // maxDepthThreshold={1.4}
                    color="#898989"
                    metalness={1}
                // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                />
            </mesh>
            {/* <primitive object={wilow} scale={1} /> */}
            <SocketManager />
            {/* <Player2/> */}
        </Physics>






    </>
}