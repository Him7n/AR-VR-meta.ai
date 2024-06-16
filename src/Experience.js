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
import { TicketCheckatom } from './Utils/TicketCheckatom.js'
import { TicketBuyMenuatom } from './Utils/TicketBuyMenuatom.js'
import ProcessML from './Component/ProcessML.js'
import MessageBox from './Component/MessageBox.js'
import { AIshowatom } from './Utils/AIshowatom.js'
import ProcessMLclassroom from './Component/ProcessMLclassroom.js'
import MessageBoxclassroom from './Component/MessagBoxclassroom.js'
import BotOffice from './Models/BotOffice.js'
import BotClass from './Models/BotClass.js'
import FileSchool from './Component/FileSchool.js'
import SelectiveRenderInsideTheater from './Component/SelectiveRenderInsideTheater.js'
import VenueFile from './Component/VenueFile.js'
import { GoupAtom } from './Utils/GoUP.js'
import Gate1 from './Models/Gate1.js'
import Gate4 from './Models/Gate4.js'
import Gate3 from './Models/Gate3.js'
import Gate2 from './Models/Gate2.js'
import Gate5 from './Models/Gate5.js'
import Gate6 from './Models/Gate6.js'
import Gate7 from './Models/Gate7.js'
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

    // const []
    const [_up, setup] = useAtom(GoupAtom)
    const [_officeMenu, setOfficeMenu] = useAtom(OfficeMenuatom);
    const [_classMenu, setClassMenu] = useAtom(ClassMenuatom);
    const [_ticketMenu, setTickerMenu] = useAtom(TicketBuyMenuatom);
    const [_aishow, setAishow] = useAtom(AIshowatom)
    const [_checkticket, setCheckticket] = useAtom(TicketCheckatom)
    //
    const [menu1, setMenu1] = useState(false);
    const targetCoordinates = [1, 0, -13];
    const SchoolTarget = [55, 1, 2];
    const ticketTarget = [65, 1, 85]
    const enterTheater = [38, 1, 89];
    const targetCoordinates2 = [50, 1, -130]
    const aiTarget = [-23, 1, -5];
    const aiTarget2 = [67, 1, -25];
    const upTarget = [30, 1, -138];
    const isWithinDistance = Distanceto(targetCoordinates);
    const isWithinDistance2 = Distanceto(targetCoordinates2);
    if (isWithinDistance || isWithinDistance2) {
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

    const arewethereyet = Distanceto(ticketTarget)

    if (arewethereyet) {
        if (!_ticketMenu) {
            setTickerMenu(true);
        }
    } else {
        if (_ticketMenu) { setTickerMenu(false) }
    }

    const enterT = Distanceto(enterTheater)

    if (enterT) {

        if (!_checkticket) {
            setCheckticket(true)
        }

    } else {

        if (_checkticket) {
            setCheckticket(false)
        }
    }
    const isai = Distanceto(aiTarget);
    const isai2 = Distanceto(aiTarget2);
    if (isai || isai2) {
        if (!_aishow) {
            setAishow(true);

        }
    } else {
        if (_aishow) {
            setAishow(false)

        }
    }
    //
    // console.log(`my socket id ${socket.id}`)
    // console.log(characters);
    // console.log(characters.length);

    const UP = Distanceto(upTarget)
    if (UP) {

        if (!_up) {
            setup(true);
            console.log('upuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuup')
        }
    } else {
        if (_up) {
            setup(false)
        }

    }
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
            <mesh castShadow position={[30, 1, -138]} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            {/* <P2/> */}

            <Shop />

            // menus---------------

            {/* {isWithinDistance && } */}

            <SelectiveRenderInside2 />
            <ProcessMLclassroom />
            <MessageBoxclassroom />

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
            <mesh receiveShadow
                position={[30, -0.9, -138]}
                rotation-x={- Math.PI * 0.5}  >
                <planeGeometry />
                <meshNormalMaterial />


            </mesh>
            <mesh receiveShadow
                position={[1, -0.9, -13]}
                rotation-x={- Math.PI * 0.5}  >
                <planeGeometry />
                <meshNormalMaterial />


            </mesh>
            <mesh receiveShadow
                position={[55, -0.9, 2]}
                rotation-x={- Math.PI * 0.5}  >
                <planeGeometry />
                <meshNormalMaterial />


            </mesh>
            <mesh receiveShadow
                position={[50, -0.9, -130]}
                rotation-x={- Math.PI * 0.5}  >
                <planeGeometry />
                <meshNormalMaterial />


            </mesh>
            <mesh receiveShadow
                position={[1, -0.9, -13]}
                rotation-x={- Math.PI * 0.5}  >
                <planeGeometry />
                <meshNormalMaterial />


            </mesh>
            <mesh receiveShadow
                position={[65, -0.9, 85]}
                rotation-x={- Math.PI * 0.5}  >
                <planeGeometry />
                <meshNormalMaterial />


            </mesh>
            <mesh receiveShadow
                position={[38, -0.9, 89]}
                rotation-x={- Math.PI * 0.5}  >
                <planeGeometry />
                <meshNormalMaterial />


            </mesh>
            <mesh receiveShadow
                position={[67, -0.9, -25]}
                rotation-x={- Math.PI * 0.5}  >
                <planeGeometry />
                <meshNormalMaterial />


            </mesh>


            <Office />
            <Venue />
            <VenueFile />

            <ProcessML />
            <MessageBox />
            <BotOffice />
            <BotClass />
            <SelectiveRenderInsideTheater />
            <SelectiveRenderInside />
            {/* {menu1 && < MenuOffice />} */}
            {/* <Room /> */}
            <Cinema />
            <TicketBooth />
            <TheatreStage />
            <WhiteRoom />
            <Gate1/>
            <Gate2/>
            <Gate3/>
            <Gate4/>
            <Gate5/>
            <Gate6/>
            <Gate7/>
            
            {/* <DoubtPanel /> */}
            <Classroom />
            {/* <Presentationiframe / */}
            <Banner />
            <FileSchool />
            {/* <primitive object={wilow} scale={1} /> */}
            {/* <SocketManager /> */}
            {/* <VoiceChat/> */}
            {/* <Player2/> */}
        </Physics>






    </>
}