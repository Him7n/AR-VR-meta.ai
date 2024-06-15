import React, { useEffect } from 'react'
import "./Product.css"
import { atom, useAtom } from 'jotai'
import { menuAtom } from '../Utils/GuildAtom'
import XrContainer from '../XR/XRContainer'
import { useState } from 'react'
import axios from 'axios'
import { item_id } from '../Utils/Itematom'
import useFetch from '../Hooks/useFetch'
const Products = () => {


  const [selectedItem, setSelectedItem] = useAtom(item_id);







  const { loading, data, error } = useFetch("https://fakestoreapi.com/products");


  const [showmenuAtom, setShowMenuAtom] = useAtom(menuAtom)
  const [xr, setXr] = useState(false);
  console.log(showmenuAtom);

  const containerStyle = {
    visibility: showmenuAtom ? 'visible' : 'hidden',
  };

  const OnClick = (id) => {
    console.log(id)
    setSelectedItem(id);
  }
  return (<>

    <div className='MainContainer' style={containerStyle}>


      <div className='left-portion  overflow-auto gap-3 scrollbar-hidden '>
        {/* {loading ? "Loading..." : (
          data.forEach((x) => {
            console.log("ljsfljsdf");
            return <div key={x.id} className='item-1 w-4/12 h-20'  >item 1  </div>

          })
        )} */}

        {loading && "Loading..."}
        {loading ? "Loading..." : (

          data.map((x) => {
            return <div key={x.id} onClick={() => { OnClick(x.id) }} className='item-1 w-3/5 h-20  flex flex-row justify-between  align-middle '  >
              <div className=' rounded-md py-2 h-fit'  >

                <img className=' h-20 rounded-tl-md' src={x.image} alt="" />
              </div>
              <div className=' p-2 flex-grow text-[12px] text-slate-200 rounded-md w-1/2 h-full flex justify-between flex-col bg-black' >{x.title}

                <p>{x.price}</p>

              </div>



            </div>
          })

        )
        }

        {/* <div className='item-1 w-4/12 h-20'  >item 1  </div> */}



      </div>


      <XrContainer />
    </div>
  </>

  )
}

export default Products