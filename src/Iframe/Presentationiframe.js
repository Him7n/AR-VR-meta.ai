import React from 'react';
import { Html } from '@react-three/drei';

const Presentationiframe = () => {
    return (
        <Html transform position={[0, 10, -179.5]}
            scale={1}  >
            <iframe width={"1450px"} height={"700vh"} src="https://in.pinterest.com/pin/11751649021238970/" frameborder="5" />

        </Html>
    );
};

export default Presentationiframe;
