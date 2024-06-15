import React, { useEffect } from 'react'
import "./Product.css"
import { atom, useAtom } from 'jotai'
import { menuAtom } from '../Utils/GuildAtom'
import XrContainer from '../XR/XRContainer'
import { useState } from 'react'
import axios from 'axios'
import useFetch from '../Hooks/useFetch'
const Products = () => {

  // const { loading, data } = useFetch();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  // console.log(data);
  // console.log(loading);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        data = response.data
        loading = false
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const [showmenuAtom, setShowMenuAtom] = useAtom(menuAtom)
  const [xr, setXr] = useState(false);
  console.log(showmenuAtom);

  const containerStyle = {
    visibility: showmenuAtom ? 'visible' : 'hidden',
  };
  return (<>

    <div className='MainContainer' style={containerStyle}>
      {loading && "Loading..."}

      <div className='left-portion overflow-auto gap-3 scrollbar-hidden '>
        {/* {data.map(() => {
          return <div className='item-1 w-4/12 h-20'  >item 1  </div>

        })} */}
        <div className='item-1 w-4/12 h-20'  >{JSON.stringify(data)} </div>


      </div>


      <XrContainer />
    </div>
  </>

  )
}

export default Products