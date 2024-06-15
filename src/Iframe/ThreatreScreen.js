import { Html } from '@react-three/drei'
import React from 'react'

const ThreatreScreen = () => {
    return (<>

        <Html occlude="blending" zIndexRange={[10, 1]} transform position={[0, 13, -179.5]}
            scale={1.3}  >
            <iframe width={"1450px"} height={"700vh"} src="chrome-extension://opmeopcambhfimffbomjgemehjkbbmji/pages/player.html#http://localhost:8409/iptv/channel/2.m3u8?mode=segmenter" frameborder="5" />

        </Html>
    </>
    )
}

export default ThreatreScreen