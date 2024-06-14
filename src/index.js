import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import { FlyControls, KeyboardControls, Sky } from '@react-three/drei'
import { PointerLockControls } from '@react-three/drei'
import Products from './Products/Products.js'
import { Controllers, Hands, XRButton, XR, VRButton, ARButton } from '@react-three/xr'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'back', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
    ]} >
        <div className="container"> {/* Wrap everything in a container for styling */}
            <Products />
            <VRButton />

            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [2.5, 4, 6]
                }}
            >
                {/* <FlyControls /> */}
                {/* <OrbitControls enabled={orbit} /> */}
                {/* <PointerLockControls /> */}
                <XR>
                    <Controllers />
                    <Hands />
                    <Sky sunPosition={[100, 20, 100]} />

                    <Experience />
                </XR>
            </Canvas>
        </div>
    </KeyboardControls>
)
