import React from 'react'
import { Html } from '@react-three/drei'
const OfficeIframe = ({ url }) => {
    return (
        <Html transform occlude={'blending'}
            zIndexRange={[10, 1]} position={[73.4, 2.9, 0.67]} rotation-y={Math.PI}
            scale={0.18}  >
            <iframe width={"1570px"} height={"720vh"} src={url} frameborder="5" />

        </Html>
    )
}

export default OfficeIframe