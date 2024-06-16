import React, { useState } from 'react';
import axios from 'axios';
import { socket } from '../Socketmanager';
import { useAtom } from 'jotai';
import { charactersAtom } from '../Socketmanager';
import ShowModel from './ShowModel';

const ModelBox = () => {
    const [characters] = useAtom(charactersAtom);
    let materials = [];
    characters.forEach((char) => {
        if (char.id === socket.id) {
            materials = char.models;
        }
    });
    const [showModel, setShowModel] = useState(false);
    const [link, setLink] = useState(null);
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(false);

    const handleChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = async () => {
        setLoad(true);
        setStatus("Loading...");
        const response = await axios.post('http://localhost:3002/api/v1/user/upload', {
            path: link
        });
        setStatus("Posted");
        const name = response.data.filename;
        const url = "http://localhost:3002/" + name[0];
        // No need to emit materialdone event as material is not selected individually
    };
    const handleCloseModel = () => {
        setShowModel(false);
    };
    const handleViewMaterial = (url) => {
        setLink(url);
        setShowModel(true);



    };

    return (
        <>
            <div className="flex absolute z-10 left-[8rem] bottom-2 h-auto w-36 bg-slate-800/5 flex-col shadow-2xl s items-center justify-center gap-y-2">
                <div className="mt-1">
                    <div className="flex max-h-[300px] w-full flex-col overflow-y-auto">
                        {materials.map((material, id) => (
                            <div key={id} className="group flex items-center gap-x-2 rounded-md px-2.5 py-2 transition-all 
                           
                            bg-transparent/5
                            
    border-none shadow-2xl duration-500 hover:bg-green-100">
                                <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                                    <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-green-900">{material.title.charAt(0)}</span>
                                </div>
                                <div className="flex flex-col items-start justify-between font-light text-white">
                                    <p className="text-[15px]">{material.title}</p>
                                    {/* You may add more details if needed */}
                                </div>
                                <button onClick={() => handleViewMaterial(material.link)} className="px-4 py-2 bg-transparent/40 outline-none 
                                text-white
                                
                                border-2 border-white rounded font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">View</button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {showModel && <ShowModel url={link} onClose={handleCloseModel} />}
        </>
    );
};

export default ModelBox;
