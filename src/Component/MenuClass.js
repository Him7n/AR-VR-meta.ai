import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { OfficeMenuatom } from '../Utils/OfficeMenuatom';
import { socket } from '../Socketmanager';
import { charactersAtom } from '../Socketmanager';
import { ClassMenuatom } from '../Utils/ClassMenuatom';
const MenuClass = () => {
    // const showMenu
    const [showmenu, setShowMenu] = useState(false)
    let Me = null;
    const [characters] = useAtom(charactersAtom);
    characters.map((char) => {
        if (char.id == socket.id) { Me = char }
    })



    const [_classMenu, setClassMenu] = useAtom(ClassMenuatom);
    const [show, setShow] = useState(true);
    const handleViewClick = () => {
        // Handle logic for View button click
        console.log('Teacher');
        setClassMenu(false);
        socket.emit("role", "teacher")
        setShow(false)
    };

    const handleOtherClick = () => {
        // Handle logic for Other button click
        console.log('Student');
        setClassMenu(false);
        setShow(false);
        socket.emit("role", "student")


    };

    return (
        <>{show && <>
            {_classMenu && (
                <div className='text-[10px] absolute bottom-[14rem] right-52 z-10 w-[10rem] mx-auto h-[1.4rem] transition-all'>
                    <button
                        className="px-4 py-2 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white 
                        text-[30px] font-extralight active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        onClick={handleViewClick}
                    >
                        Teacher
                    </button>
                    <button
                        className="px-4 py-2 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white font-extralight text-[30px] active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                        onClick={handleOtherClick}
                    >
                      Student
                    </button>
                </div>
            )}


        </>}

        </>
    );
};

export default MenuClass;
