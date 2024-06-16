import React from 'react'
import XrCube from '../XR/XrCube'
import { Canvas } from '@react-three/fiber';
const ShowModel = () => {
    return (<div className='absolute z-10 bottom-5 right-2 border-[1px] border-black  flex flex-col justify-around align-middle' >
        <Canvas style={{ width: '350px', height: '250px' }}


        >


            <XrCube />


        </Canvas>

        <button class="px-4  py-2 mb-1 bg-transparent text-[10px] outline-none border-2 border-indigo-400 rounded text-indigo-500 font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">AR</button>

    </div>
    )
}

export default ShowModel