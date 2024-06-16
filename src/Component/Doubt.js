import React from 'react'
import { socket } from '../Socketmanager'
const Doubt = () => {
    const RaiseDoubt = () => {

        console.log(socket.id, "Raise a doubt");
        socket.emit("Doubt", true);

    }
    return (
        <button onClick={RaiseDoubt}
            class="middle none center absolute z-10 left-2 mr-2 top-56 border-[1px] rounded-lg  py-2 px-2 font-sans text-[12px] font-bold uppercase text-white shadow-mdtransition-all 
            border-none
            shadow-lg
            hover:shadow-sm  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 "
            data-ripple-light="true"
        >
            Raise Doubt
        </button>
    )
}

export default Doubt