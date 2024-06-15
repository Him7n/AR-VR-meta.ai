/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Women1(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('./models/Animated Woman.glb')
    const { actions } = useAnimations(animations, group)
    return (
        <group ref={group} dispose={null} position={[props.position[0], props.position[1], props.position[2]]} rotation-y={props.rot}>
            <group name="Root_Scene">
                <group name="RootNode">
                    <group name="Armature" rotation={[-Math.PI / 2, 0, 0]}>
                        <primitive object={nodes.Hips} />
                    </group>
                    <skinnedMesh
                        name="Woman"
                        geometry={nodes.Woman.geometry}
                        material={materials.Material}
                        skeleton={nodes.Woman.skeleton}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('./models/Animated Woman.glb')