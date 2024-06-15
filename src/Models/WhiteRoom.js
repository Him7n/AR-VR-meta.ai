import { useGLTF } from '@react-three/drei'
import React from 'react'

const WhiteRoom = () => {
    const WhiteRoom = useGLTF("./models/white_room.glb")
    return (
        <primitive object={WhiteRoom.scene} rotation-y={Math.PI} position={[+100, -0.4, 0]} scale={3} />
    )
}

export default WhiteRoom