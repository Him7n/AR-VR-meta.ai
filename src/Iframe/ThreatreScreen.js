import { Html } from '@react-three/drei'
import React from 'react'

const ThreatreScreen = () => {
    return (<>

        <Html occlude="blending" transform position={[0, 10, -179.5]}
            scale={1}  >
            <iframe width={"1450px"} height={"700vh"} src="https://www.bugswriter.com/work/" frameborder="5" />

        </Html>
    </>
    )
}

export default ThreatreScreen