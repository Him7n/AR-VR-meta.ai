import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { KeyboardControls } from '@react-three/drei';
import { VRButton } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import Enviroment from '../Pages/Enviroment';
const AppRoutes = () => {
    return (
        <Router>
            <Routes> {/* Use the correct Routes component here */}
                <Route element={<Enviroment />} path='/' />
            </Routes>
        </Router>
    )
}

export default AppRoutes