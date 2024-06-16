import React, { useState } from 'react';
import axios from 'axios';
import { socket } from '../Socketmanager';
import { useAtom } from 'jotai';
import { charactersAtom } from '../Socketmanager';
const AssignmentBox = () => {
    const [characters] = useAtom(charactersAtom);
    let assignments = [];
    characters.map((char) => {
        if (char.id == socket.id) {
            assignments = char.assignments
        }
        // console.log(char.position);
        // console.log(char.delta);

    })
    //  assignments = [
    //     { id: 1, name: 'Assignment 1', details: 'Details for Assignment 1' },
    //     { id: 2, name: 'Assignment 2', details: 'Details for Assignment 2' },
    //     { id: 3, name: 'Assignment 3', details: 'Details for Assignment 3' },
    //     // Add more assignments as needed
    // ];
    console.log(assignments);
    const [status, setstatus] = useState(null);
    const [load, setLoad] = useState(false);

    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [link, setlink] = useState(null);
    const HandleChange = (e) => { setlink(e.target.value) }
    const HandleSubmit = async () => {
        console.log(link);
        setLoad(true);
        setstatus("Loading...")
        const response = await axios.post('http://localhost:3002/api/v1/user/upload', {
            path: link

        })
        setstatus("Posted")
        console.log(response.data.filename)
        const name = response.data.filename;
        console.log(name[0])
        console.log("hihi")
        const url = "http://localhost:3002/" + name[0];
        console.log(url);
        socket.emit('assignmentdone', {
            link: url,
            title: selectedAssignment.title
        })

    }
    const handleOpenAssignment = (assignment) => {
        setSelectedAssignment(assignment);
    };

    const handleGoBack = () => {
        setSelectedAssignment(null);
    };

    return (
        <div className="flex absolute z-10  left-[8rem] bottom-2 h-auto w-36 bg-slate-800/5 flex-col shadow-2xl items-center justify-center gap-y-2">
            {!selectedAssignment ? (
                <div className="mt-1">
                    <div className="flex max-h-[300px] w-full flex-col overflow-y-auto">
                        {assignments.map((assignment, id) => (
                            <button key={id} onClick={() => handleOpenAssignment(assignment)} className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all border-none shadow-md duration-75 hover:bg-green-100">
                                <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                                    <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-green-900">{assignment.title.charAt(0)}</span>
                                </div>
                                <div className="flex flex-col items-start justify-between font-light text-gray-600">
                                    <p className="text-[15px]">{assignment.title}</p>
                                    <span className="text-[12px] font-light text-gray-400">{assignment.status}</span>
                                    <span className="text-[12px] font-light text-gray-400">{assignment.dueDate}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='flex  flex-col p-2 shadow-xl '>
                    <button onClick={handleGoBack} class="px-4 py-2 bg-transparent outline-none border-2 border-indigo-400 rounded text-indigo-500 font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 mr-1 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">Back</button>
                    <div className='flex flex-col px-1' >
                        <p className='font-extralight text-[25px]' >{selectedAssignment.title}</p>
                        <p className='font-extralight text-[12px]'>{selectedAssignment.description}</p>



                        <div class="max-w-2xl mx-auto s">


                            <div class="max-w-2xl mx-auto s">
                                {selectedAssignment.status === "pending" ? (
                                    // Content to render if status is "pending"
                                    <>     <input onChange={(e) => HandleChange(e)} class="block w-[250px] text-gray-900  text-[12px] border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none mt-5 my-3" id="file_input" type="text" />
                                        <button onClick={HandleSubmit} class=" px-1 py-1 mb-2  cursor-pointer text-[20px] font-medium text-gray-900 shadow-lg mt-1" for="file_input">Turn in</button>


                                        {load && <p className='text-[10px]' >
                                            {status}
                                        </p>

                                        }</>
                                ) : (
                                    // Content to render if status is not "pending"

                                    <>
                                        <div className='text-[20px]' > Completed Assignment</div>
                                        <button class="px-4 py-2 bg-transparent outline-none border-2 border-indigo-400 rounded text-indigo-500 font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">View</button>

                                    </>
                                )}


                            </div>



                        </div>




                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentBox;
