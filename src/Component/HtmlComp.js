import { Html } from '@react-three/drei'
import React from 'react'

const HtmlComp = () => {

    return (
        <Html occlude={"blending"} zIndexRange={[10, 1]} >
            <h1>HI There</h1>

        </Html >
    )
}

export default HtmlComp