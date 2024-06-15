import { useFBX, useGLTF } from '@react-three/drei'
import React from 'react'
import Banner4 from './Banner4'
import Banner3 from './Banner3'
import Banner2 from './Banner2'
import MovieBanner from './MovieBanner'

const Banner = () => {

    const banner = useFBX('./models/Banner.fbx')
    return (
        <>
            <primitive object={banner} position={[0, 0, 78]}
                rotation-y={-Math.PI / 5}
                scale={0.07} />

            <Banner4 />
            <Banner2 />
            <Banner3 />
            <MovieBanner />
        </>
    )
}

export default Banner