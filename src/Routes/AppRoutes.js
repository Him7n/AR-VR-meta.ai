import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { KeyboardControls } from '@react-three/drei';
import { VRButton } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import Enviroment from '../Pages/Enviroment';
import ArCube from '../AR/ArCube';
import { Signin } from '../Pages/Signin';
import { Signup } from '../Pages/Signup';
import Item from '../Pages/Item';
import VoiceChat from '../Pages/VoiceChat';
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Enviroment />} path='/' />
                <Route element={<VoiceChat />} path='/vc' />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/user/product" element={<Item />} />
                {/* <Route element={<ArCube />} path='/xr' /> */}
            </Routes>
        </Router>
    )
}

export default AppRoutes