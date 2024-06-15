/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


export function Her(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("./model(1).gltf");
  const { actions } = useAnimations(animations, group);
  const { nodes, materials } = useGLTF("/model(1).gltf");
  // console.log(props.position[0]);

  useFrame((state, delta) => {

    // colliderRef.current.position = group.current.position;
    // console.log(colliderRef.current.position);
    // if (character.id === props.findme) {

    //     state.camera.position.copy(new THREE.Vector3(group.current.position.x, group.current.position.y + 5, group.current.position.z + 6));
    //     state.camera.lookAt(new THREE.Vector3(group.current.position.x, group.current.position.y + 2, group.current.position.z));
    //     // state.camera.rotation.copy(group.current.position);
    // }
    // console.log(group.current.position);
    // console.log(props.position);

    // console.log(group.current.position);
    group.current.position.x = props.position[0];
    group.current.position.y = props.position[1];
    group.current.position.z = props.position[2];

    group.current.rotation.y = props.rotation;

    // if (group.current.position.distanceTo(props.position) > 0.01) {
    //     const direction = group.current.position
    //         .clone()
    //         .sub(props.position)
    //         .normalize()
    //         .multiplyScalar(MOVEMENT_SPEED);
    //     group.current.position.sub(direction);
    //     group.current.lookAt(props.position);
    //     setAnimation("CharacterArmature|Run");
    // } else {

    //     setAnimation("CharacterArmature|Idle");
    // }
  });



  return (
    <group ref={group} dispose={null}>
      <group rotation={[Math.PI / 2, 0, Math.PI]}>
        <mesh

          geometry={nodes.Cube020.geometry}
          material={materials["Purple.008"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020_1.geometry}
          material={materials["Black.019"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020_2.geometry}
          material={materials["Yellow.010"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020_3.geometry}
          material={materials["GreenLight.003"]}
        />
        <group position={[0.204, 0, -0.634]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube018.geometry}
            material={materials["GreenLight.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube018_1.geometry}
            material={materials["Purple.008"]}
          />
        </group>
        <group position={[-0.204, 0, -0.634]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube019.geometry}
            material={materials["Purple.008"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube019_1.geometry}
            material={materials["GreenLight.003"]}
          />
        </group>
        <group position={[0, 0, -0.704]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017.geometry}
            material={materials["Black.019"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_1.geometry}
            material={materials["GreenLight.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_2.geometry}
            material={materials["Green.003"]}
          />
          <group position={[0, -0.071, -0.768]} rotation={[-0.264, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube016.geometry}
              material={materials["Purple.008"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube016_1.geometry}
              material={materials["Black.019"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube016_2.geometry}
              material={materials["Yellow.010"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/model(1).gltf");
// /home/lildicky/Downloads/model(1).gltf