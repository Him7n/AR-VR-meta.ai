import React, { useState } from 'react'
import axios from 'axios';
import { useAtom } from 'jotai';
import { AiMessageAtom } from '../Utils/AiMessageAtom';
const AskaiInput = () => {
    const [message, setMessage] = useAtom(AiMessageAtom);

    console.log(message);
    const [messagee, setMessagee] = useState("");
    const HandleOnchange = (e) => {
        setMessagee(e.target.value)
        console.log(message);


    }
    const HandleOnSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        setMessage("Leading..");
        console.log("hipjijpo");

        try {
            const form = new FormData();
            form.append('question', messagee); // Assuming file is obtained from an input element
            setMessage("Loading...");
            // console.log("Processing", path);

            const response = await axios.post('http://localhost:8000/answer_question/', form);

            console.log(response.data);
            const formattedAnswers = response.data.answer.replace(/\n/g, '<br>');


            setMessage(formattedAnswers);
            // Handle the response or update UI as needed
        } catch (error) {
            console.error('Error processing PDF:', error);
            setMessage("Error Occured ! Please check and try again");

            // Handle errors or show error messages
        }
    }
    return (
        //     <div className='bg-gray-800/55    w-full
        //   h-auto py-[1px] rounded-[12px] flex align-middle justify-center  -gap-[23px] border-[1px] border-black '  >
        //         <input type="text" className=' w-5/6 mx-2 rounded-[10px] px-3 border-2 font-extralight  border-black' />
        //         <button className='transition ease-in-out delay-50 px-3 rounded-[10px] 
        //         bg-gray-500


        //         text-white text-[32px] hover:bg-black hover:text-white  mr-3  ' > send </button>
        //     </div >
        <div className="max-w-2xl mx-auto">

            <form>
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg ">
                    <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 ">
                        <svg className="w-6 h-6" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                    </button>

                    <textarea onChange={(e) => { HandleOnchange(e) }} id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>
                    <button onClick={HandleOnSubmit} className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg className="w-6 h-6 rotate-90" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    </button>
                </div>
            </form>



        </div>
    )
}

export default AskaiInput