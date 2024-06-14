import React from 'react'
import { MeshNormalMaterial } from 'three'


const Shop = () => {


    return (
    
<>
<mesh position={[30,-0.99,20]} rotation-x={-Math.PI/2}  scale={10} >
<planeGeometry/>
<meshStandardMaterial color={"red"} />
</mesh>
</>


  )
}

export default Shop