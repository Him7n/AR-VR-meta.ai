import React from 'react'
import AlertMessage from './AlertMessage';
import { charactersAtom } from '../Socketmanager';
import { socket } from '../Socketmanager';
import { useAtom } from 'jotai';
import Doubt from './Doubt';
const DoubtPanel = () => {
    const [characters] = useAtom(charactersAtom);
    console.log(characters.length);
    return (<>
        <div className='w-auto z-10 mr-1 bg-white/0 absolute right-1 top-52' >

            {characters.map((character) => {

                if (character.doubt) {
                    return (<AlertMessage _socketid={character.id} />
                    )
                }
            })}
        </div>
        <Doubt />
    </>

    )
}

export default DoubtPanel