import { OrbitControls, PointerLockControls, useFBX, useGLTF } from '@react-three/drei'
import { socket, charactersAtom } from './Socketmanager'
import { useAtom } from 'jotai'
import { menuAtom } from './Utils/GuildAtom'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useAnimations } from '@react-three/drei'
import gsap from 'gsap'
import { useControls } from 'leva'
import { RigidBody } from '@react-three/rapier'
import React from 'react'
import { useRef } from 'react'
// port { RigidBody } from '@react-three/rapier'
// import React from 'react'

import { KeyboardControls, useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
// import { useRef } from 'react'
import { useState, useEffect } from 'react'
// import { updateCamera } from '@react-three/fiber/dist/declarations/src/core/utils'




const Player = ({ id, position, rotation, delta }) => {




    const [showmenuAtom, setShowMenuAtom] = useAtom(menuAtom)
    /**
     * 
     * 
     * 
     *   GSAP GOES HERE
     */

    const tl = gsap.timeline();







    // const DefaultCordinates = [30,-1,20];   // iykuk
    const DefaultCordinates = new THREE.Vector3(30, 1, 20);

    /**
     * 
     *   
     * 
     * 
     * 
     */


    const [showmenu, setShowMenu] = useState(false);

    /**
     * 
    *
    *  SOCKET CONTROL CORDiNATES
    * 
    * 
    * 

     */

    const [characters] = useAtom(charactersAtom);
    // finding me 
    const character = characters.find((character) => { return character.id == socket.id })
    // console.log(position);
    // console.log(position);
    // console.log(delta)
    // console.log(id);
    // console.log(character);
    /**
     * 
     * 
     * 
     *    TESTING?
     * 
     * 
     */
    let walkdirection = new THREE.Vector3();
    let rotateangle = new THREE.Vector3(0, 1, 0);
    let rotateQuaternion = new THREE.Quaternion();
    let CameraTarget = new THREE.Vector3();
    const controlsRef = useRef();


    const body = useRef();
    const [smoothCamera] = useState(new THREE.Vector3());
    const [subscribekeys, getkeys] = useKeyboardControls();
    const hamburger = useGLTF('./hamburger.glb');
    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
    });

    const SmoothDelay = (value) => {
        setTimeout(() => {
            // setShowMenuAtom(showmenu);
            setShowMenuAtom(value);
        }, 1000);

    }

    const camera = useThree((state) => state.camera)
    showmenu ? SmoothDelay(true) : setShowMenuAtom(false);
    // GSAP working , just working 
    if (showmenu) {
        tl.to(camera.position, {
            x: 18,
            y: 3,
            z: 18,
            ease: "easein",

        });


        // make a mesh greenwne you cant ahave accessto that yet



    }





    //imma use that

    const directionoffest = ({ forward, back, left, right }) => {
        var dirOffest = 0;
        if (forward) {
            if (left) {
                dirOffest = Math.PI / 4;
            } else if (right) {
                dirOffest = -Math.PI / 4;
            }
        } else if (back) {
            if (left) {
                dirOffest = Math.PI / 4 + Math.PI / 2;
            } else if (right) {
                dirOffest = Math.PI + Math.PI / 4;

            } else {
                dirOffest = Math.PI;
            }
        } else if (left) {
            dirOffest = Math.PI / 2;

        } else if (right) {
            dirOffest = -Math.PI / 2;

        }

        return dirOffest;
        /**
         *  Gandalf
         */


    }
    const model = useFBX('./models/Angry.fbx');
    model.animations[0].name = 'Angry';
    // body.current.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
    //**
    // Animations
    /*/
*/
    const AAnimations = [];

    const mixer = new THREE.AnimationMixer(model);

    const [currentAnimation, setcurrentAnimation] = useState("Angry")

    const ani = model.animations;
    // let aniname = ani.name;
    console.log(ani);
    const run = useFBX("./assets/character/running.fbx");
    run.animations[0].name = "run";
    // console.log(run.animations[0].name);
    if (ani.length < 5) {

        ani.push(run.animations[0])
    }
    ani["run"] = run.animations[0];
    console.log(ani.length, "ani ka size")
    // AAnimations.push({
    //     name: "run", clip: mixer.clipAction(run.animations[0])
    // });
    const animations = useAnimations(ani, model)
    // console.log(run.animations);
    run.animations[0].name = "run";
    console.log(run.animations[0].name);
    // leva

    //  const { animationName } = useControls({
    //     animationName: { options: animations.names }
    // })
    // leva
    console.log(animations.actions)
    useEffect(() => {
        const action = animations.actions[currentAnimation]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [currentAnimation])

















    // console.log(model.scene);
    useFrame((state, delta) => {

        // console.log("ShowmenuyAtom        :" + showmenuAtom)

        // body.current.rotation = new THREE.Vector3(0,Math.PI,0);
        // console.log(getkeys());

        const { forward, left, right, jump, back, shift } = getkeys();
        // socket.emit()
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }
        const impulseStrength = delta;

        // if(forward){
        //     impulse.z = -1;
        // }
        // if(back){
        // impulse.z =+1;
        // }
        // if(right){
        // impulse.x =+1;
        // }
        // if(left){
        // impulse.x=-1;
        // }
        // if(jump){
        // impulse.y=+5;
        // }
        // body.current.applyImpulse(impulse);
        //   if (left) {
        //     torque.y = 1;
        //   } else if (right) {
        //     torque.y = -1;

        //   body.current.applyTorqueImpulse(torque);


        // console.log(keys);

        /** Camera */
        // const bodyposition = body.current.translation();
        // console.log(bodyposition)
        // const cameraposition = new THREE.Vector3();
        // cameraposition.copy(bodyposition);
        // cameraposition.z += 10;
        // cameraposition.y+=5;

        // const cameraTarget = new THREE.Vector3();

        // cameraTarget.copy(bodyposition);
        // cameraTarget.y+=2.25;

        // state.camera.position.copy(cameraposition);
        // state.camera.lookAt(cameraTarget);
        // body.current.applyTorqueImpulse(t);

        const bodyposition = body.current.position;

        if (body.current.position.distanceTo(DefaultCordinates) <= 7) {
            // console.log("body.current.position.distanceTo(DefaultCordinates in ");
            // setShowMenu(()=>{ if(showmenu) })

            !showmenu ? setShowMenu(true) : null;

        } else {
            // console.log("out")
            showmenu ? setShowMenu(false) : null;
        }

        // console.log(showmenu);
        if (!showmenu) {
            const cameraPosition = new THREE.Vector3();
            cameraPosition.copy(bodyposition);
            cameraPosition.z += 5.25;
            cameraPosition.y += 2.65;
            // const TargetPosition = new THREE.Vector3();
            // TargetPosition.copy(bodyposition)
            // TargetPosition.y += 0.25;
            smoothCamera.lerp(cameraPosition, 0.1);
        }
        // state.camera.position.copy(smoothCamera)
        // state.camera.lookAt(TargetPosition)
        // j.log(bodyposition)
        const cameraRotation = state.camera.rotation;
        // body.current.rotation(0, cameraRotation.y, 0);
        // body.current.rotation(state.camera.rotation);
        // console.log(state.camera.rotation);
        // console.log(body.current.rotation());

        /** */

        let AngleYcameraDirection = Math.atan2(
            state.camera.position.x - body.current.position.x,
            state.camera.position.z - body.current.position.z
        )

        //offset
        let newdirOffset = directionoffest({ forward, back, left, right });

        // console.log("newdirection offset ",newdirOffset);   
        // const axis = new THREE.Vector3(0, 1, 0);
        //* rotating the model
        rotateQuaternion.setFromAxisAngle(
            rotateangle, AngleYcameraDirection + newdirOffset + Math.PI
        )
        // console.log(body.current);
        // console.log(AngleYcameraDirection+newdirOffset);
        socket.emit("rotation", [AngleYcameraDirection + newdirOffset]);

        body.current.quaternion.rotateTowards(rotateQuaternion, 0.2);
        // body.current.setRotation(rotateQuaternion);

        //will it work
        state.camera.getWorldDirection(walkdirection);
        walkdirection.y = 0;
        walkdirection.normalize();
        walkdirection.applyAxisAngle(rotateangle, newdirOffset);

        //walk run velocity
        let velocity = 0;



        //MOVE MODELS

        if (forward || back || left || right) {
            setcurrentAnimation("run")

            if (shift) {
                velocity = 10;
            }
            velocity = 5;
        } else {
            setcurrentAnimation("Angry")
            velocity = 0;
        }

        // console.log(walkdirection);
        // console.log(walkdirection.x*velocity*delta);


        const movex = walkdirection.x * velocity * delta;
        const movez = walkdirection.z * velocity * delta;
        // console.log(movex, movez);

        // -0.03307692307683356 -0.07938461538440045
        socket.emit('position', {
            x: body.current.position.x + movex,
            y: body.current.position.y,
            z: body.current.position.z + movez,
        });
        body.current.position.x += movex;
        body.current.position.z += movez;
        body.current.position.y = position[1];
        socket.emit('delta', {
            x: movex,
            y: 0,
            z: movez,
        });

        //   console.log(props);




        //   body.current.setTranslation( new THREE.Vector3(movex,0,movez));

        //camera is more important
        state.camera.position.x += movex;
        state.camera.position.z += movez;
        // updateCamera()
        CameraTarget.x = body.current.position.x;
        CameraTarget.y = body.current.position.y + 2;
        CameraTarget.z = body.current.position.z;
        if (controlsRef.current) {
            controlsRef.current.target = CameraTarget;
        }

    })


    return (
        <>
            {/* <PointerLockControls ref={controlsRef} /> */}
            <OrbitControls ref={controlsRef} />

            {/* <RigidBody position={[position[0] , position[1], position[2]]} colliders={'cuboid'} friction={0}> */}
            <primitive object={model} scale={0.02} ref={body} position-y={-1.4} castShadow />

            {/* </RigidBody> */}




        </>
    )
}

export default Player