import React from 'react'
import { useFBX } from '@react-three/drei'
const Banner2 = () => {

    const banner = useFBX('./models/Banner2.fbx')
    return (
        <>
            <primitive object={banner} position={[+55, 3, 92]}

                scale={0.07} />

        </>
    )
}

export default Banner2