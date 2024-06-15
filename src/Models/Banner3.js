import { useFBX } from '@react-three/drei'
import React from 'react'

const Banner3 = () => {

    const banner = useFBX('./models/Banner3.fbx')
    return (
        <>
            <primitive object={banner} position={[-15, 15, 67]}
                rotation-y={-Math.PI / 5}
                scale={0.07} />

        </>
    )
}

export default Banner3