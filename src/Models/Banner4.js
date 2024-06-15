import { useFBX } from '@react-three/drei'
import React from 'react'

const Banner4 = () => {
    const banner = useFBX('./models/Banner4.fbx')
    return (
        <>
            <primitive object={banner} position={[10, 10, 78]}
                rotation-y={-Math.PI / 5}
                scale={0.07} />

        </>
    )
}

export default Banner4