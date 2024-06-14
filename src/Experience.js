import { OrbitControls, PointerLockControls } from '@react-three/drei'
import Lights from './Lights.js'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import Player from './Player.js'
import * as THREE from 'three';
import Player2 from './Player2.js';
import { SocketManager, charactersAtom, socket } from './Socketmanager.js';
import Cordinates from './Utils/Cordinates.js';
import { useAtom } from 'jotai';
import Shop from './Component/Shop.js';
import { useThree } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
THREE.ColorManagement.legacyMode = false;




export default function Experience() {
    const [characters] = useAtom(charactersAtom);

    // finding me 
    const character = characters.find((character) => { return character.id == socket.id })

    //----
    // VR
    const { gl, camera } = useThree();
    const xr = useXR();

    // if (xr.isPresenting) {
    //     console.log("XRRR is already present")
    //     // Update camera position in VR mode
    //     camera.position.set(character.position[0], character.position[1], character.position[2]); // Set the desired position
    //     camera.updateMatrixWorld(); // Update the camera's world matrix
    // }

    const { isPresenting, player } = useXR()


    useFrame(() => {

        // if (isPresenting) {
        //     player.position.x = character.position[0] + 0.4
        //     player.position.y = character.position[1] + 1
        //     player.position.z = character.position[2]

        //     player.rotation.y = character.rotation
        // }

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
            <RigidBody>
                {/* <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh> */}
            </RigidBody>





            {/* <Player/> */}
            <mesh castShadow position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <RigidBody colliders="cuboid" type='fixed' restitution={0} friction={0.5} >
                <Shop />
                <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={80}>
                    <planeGeometry />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
            <SocketManager />
            {/* <Player2/> */}
        </Physics>






    </>
}