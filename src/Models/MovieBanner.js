import { useFBX } from '@react-three/drei'
import React from 'react'
useFBX
const MovieBanner = () => {
    const banner = useFBX('./models/MenuBoard.fbx')
    return (
        <>
            <primitive object={banner} position={[24, 3, 88]}
                rotation-x={-Math.PI / 2}
                rotation-z={-Math.PI / 3}


                scale={0.05} />

        </>
    )
}

export default MovieBanner