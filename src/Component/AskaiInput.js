import React, { useState } from 'react'
import axios from 'axios';
const AskaiInput = () => {

    
    const [message,setMessage] =useState("");
    const HandleOnchange = (e)=>{
setMessage(e.target.value)
console.log(message);
;
       
}
    const HandleOnSubmit = async () => {
        try {
            const form = new FormData();
            form.append('message', message); // Assuming file is obtained from an input element
            setLoading("Loading...");
            console.log("Processing", path);

            const response = await axios.post('http://localhost:8000/answer_question/', form);

            console.log(response.data);
            setLoading("Processing Completed!");
            // Handle the response or update UI as needed
        } catch (error) {
            console.error('Error processing PDF:', error);
            setLoading("Error Occured ! Please check and try again");
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
        <div class="max-w-2xl mx-auto">

            <form>
                <label for="chat" class="sr-only">Your message</label>
                <div class="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                    <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                    </button>

                    <textarea  onChange={(e)=>{HandleOnchange(e)}} id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                    <button  onClick={HandleOnSubmit} class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    </button>
                </div>
            </form>



        </div>
    )
}

export default AskaiInput