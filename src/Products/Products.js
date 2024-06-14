import React from 'react'
import "./Product.css"
import { atom, useAtom } from 'jotai'
import { menuAtom } from '../Utils/GuildAtom'
import XrContainer from '../XR/XRContainer'
import { useState } from 'react'
const Products = () => {


  const [showmenuAtom, setShowMenuAtom] = useAtom(menuAtom)
  const [xr, setXr] = useState(false);
  console.log(showmenuAtom);

  const containerStyle = {
    visibility: showmenuAtom ? 'visible' : 'hidden', // Example: Change background color
    // Add more CSS properties as needed
  };
  return (<>

    <div className='MainContainer' style={containerStyle}>
      {/* <h3>Guild</h3> */}

      <div className='left-portion'>
        <div className='item-1'  >item 1  </div>
        <div className='item-1' > item 2  </div>

      </div>
      <div className='right-portion'> <div className='item-1' >  item 3</div>
        <div className='item-1' > item 4  </div></div>

      <XrContainer />
    </div>
  </>

  )
}

export default Products