import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { KeyboardControls } from '@react-three/drei';
import { VRButton } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import Enviroment from '../Pages/Enviroment';
import ArCube from '../AR/ArCube';
const AppRoutes = () => {
    return (
        <Router>
            <Routes> 
                <Route element={<Enviroment />} path='/' />
                {/* <Route element={<ArCube />} path='/xr' /> */}
            </Routes>
        </Router>
    )
}

export default AppRoutes