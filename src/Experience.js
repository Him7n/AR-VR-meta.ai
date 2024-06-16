import { OrbitControls, PointerLockControls, useFBO, useGLTF } from '@react-three/drei'
import Lights from './Lights.js'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { useTexture } from '@react-three/drei'
import { MeshReflectorMaterial } from '@react-three/drei'
import Player from './Player.js'
import * as THREE from 'three';
import Player2 from './Player2.js';
import { SocketManager, charactersAtom, socket } from './Socketmanager.js';
import Distanceto from './Component/Distanceto.js'
import { useFBX } from '@react-three/drei'
import Cordinates from './Utils/Cordinates.js';
import TheatreStage from './Models/TheatreStage.js'
import { useAtom } from 'jotai';
import Shop from './Component/Shop.js';
import { useThree } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import Char1 from './Models/Char1.js';
import { P2 } from './Models/P2.js'
import { LowPoly } from './Utils/LowPoly.js'
import Office from './Models/Office.js'
import Venue from './Models/Venue.js'
import Room from './Models/Room.js'
import WhiteRoom from './Models/WhiteRoom.js'
import Presentation from './Iframe/Presentationiframe.js'
import Presentationiframe from './Iframe/Presentationiframe.js'
import VoiceChat from './Pages/VoiceChat.js'
import Cinema from './Models/Cinema.js'
import ThreatreScreen from './Iframe/ThreatreScreen.js'
import Banner from './Models/Banner.js'
import TicketBooth from './Models/TicketBooth.js'
import Classroom from './Models/Classroom.js'
import DoubtPanel from './Component/DoubtPanel.js'
import Doubt from './Component/Doubt.js'
// import MenuOffice from './Component/MenuOffice.js'
import { OfficeMenuatom } from './Utils/OfficeMenuatom.js'
import SelectiveRender from './Component/SelectiveRender.js'
import SelectiveRenderInside from './Component/SelectiveRenderInside.js'
import UplaodOffice from './Component/UplaodOffice.js'
import { ClassMenuatom } from './Utils/ClassMenuatom.js'
import SelectiveRenderInside2 from './Component/SelectiveRenderInside2.js'
THREE.ColorManagement.legacyMode = false;




export default function Experience() {
    //-- test--

    const hamburger = useGLTF("http://localhost:3002/hamburger.glb");

    //---
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


    const [_officeMenu, setOfficeMenu] = useAtom(OfficeMenuatom);
    const [_classMenu, setClassMenu] = useAtom(ClassMenuatom);
    //
    const [menu1, setMenu1] = useState(false);
    const targetCoordinates = [1, 0, -13];
    const SchoolTarget = [85, 1, 1];
    const isWithinDistance = Distanceto(targetCoordinates);

    if (isWithinDistance) {
        if (!_officeMenu) {
            setOfficeMenu(true);
        }
    } else {
        if (_officeMenu) { setOfficeMenu(false) }
    }
    const schoolDistance = Distanceto(SchoolTarget);
    if (schoolDistance) {
        console.log(
            "class reached"
        )
        console.log(_classMenu)
        if (!_classMenu) {
            setClassMenu(true);
        }
    } else {
        console.log(
            "class not reached"
        )
        if (_classMenu) { setClassMenu(false) }
    }

    //
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
            <mesh castShadow position={[85, 1, 1]} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            {/* <P2/> */}

            <Shop />

            // menus---------------

            {/* {isWithinDistance && } */}

            <SelectiveRenderInside2 />

            //-----------------

            <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={300}>
                <planeGeometry />
                <MeshReflectorMaterial
                    side={2}
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
            <Office />
            <Venue />

            <SelectiveRenderInside />
            {/* {menu1 && < MenuOffice />} */}
            {/* <Room /> */}
            <Cinema />
            <TicketBooth />
            <primitive object={hamburger.scene} scale={0.1} />
            <TheatreStage />
            <WhiteRoom />
            {/* <DoubtPanel /> */}
            <Classroom />
            {/* <Presentationiframe / */}
            <Banner />
            {/* <primitive object={wilow} scale={1} /> */}
            {/* <SocketManager /> */}
            {/* <VoiceChat/> */}
            {/* <Player2/> */}
        </Physics>






    </>
}