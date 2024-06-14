import { Html, PresentationControls } from '@react-three/drei'
import React from 'react'

const Iframe = () => {

    return (
        <PresentationControls >
            <ambientLight />
            <mesh scale={1.5} >
                <planeGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={"mediumpurple"} />
            </mesh>

            <Html transform position={[0, 1, 0]} scale={1}>
                <iframe src="https://invidious.io/" />
            </Html>
        </PresentationControls>
    )
}

export default Iframe