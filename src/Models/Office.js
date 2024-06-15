import { useGLTF } from '@react-three/drei'
import React, { Suspense } from 'react'

const Office = () => {
    const OfficeModel = useGLTF("./models/mersus_office.glb");



    return (<Suspense>
        <primitive scale={3} position={[-50, -1.1, 0]} object={OfficeModel.scene} />
    </Suspense>
    )
}

export default Office