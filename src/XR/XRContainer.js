import { useState } from 'react';
import { ARButton, XR } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import XrCube from './XrCube';
import "./Xr.css";
import { Html } from '@react-three/drei';
import Iframe from '../Iframe/Iframe';

export default function XrContainer() {
    const [showIframe, setShowIframe] = useState(false);

    // Function to toggle between showing the Canvas and the iframe
    const toggleIframe = () => {
        setShowIframe(!showIframe);
    };

    return (
        <>

            <>
                <ARButton />
                <div className="container2">
                    <Canvas style={{ width: '1000px', height: '800px' }}>
                        {!showIframe ? (<XR>
                            <XrCube />
                        </XR>) : (


                            <Iframe />
                        )}


                    </Canvas>
                    {!showIframe ? (<div className="Productinfo" style={{ marginTop: '10px' }}>
                        <button onClick={() => alert('ENTER AR')}>Enter AR</button>
                        <button onClick={() => toggleIframe()}>Details</button>
                    </div>) : null}

                </div>
            </>

            <> {showIframe ? (<button className='back-button' onClick={() => toggleIframe()}>Back</button>) : null}



            </>

        </>
    );
}
