import React from 'react'
import { AiMessageAtom } from '../Utils/AiMessageAtom'
import { useAtom } from 'jotai'
import AskaiInput from './AskaiInput';
const MessageBox = () => {
  const [message, setMessage] = useAtom(AiMessageAtom);
  console.log(message);

  return (
    <>


      <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
        <div><span class="px-4 py-5 rounded-lg inline-block rounded-br-none bg-blue-600 text-white transition-all ease-in-out " dangerouslySetInnerHTML={{ __html: message }} >


        </span></div>
      </div>
      <AskaiInput />

    </>
  )
}

export default MessageBox