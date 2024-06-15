import { useFBX, useGLTF } from '@react-three/drei'
import React, { Suspense } from 'react'
import { MeshNormalMaterial, PlaneGeometry } from 'three';

const Office = () => {
    const OfficeModel = useFBX("./models/OnlyTables2.fbx");

    const room = useGLTF('./models/office_empty.glb');

    return (<Suspense>
        <mesh castShadow position-x={6} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <primitive scale={0.025} rotation-y={Math.PI / 2} position={[-76, -1, -11]} object={OfficeModel} />
        <primitive scale={0.004} position={[-50, -1.1, 6]} object={room.scene} rotation-y={Math.PI / 2} />
    </Suspense>
    )
}

export default Office