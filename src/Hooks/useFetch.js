import React, { lazy, useEffect, useState } from 'react'
import axios from 'axios'

function useFetch() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(async () => {
        setLoading(true)
        const response = await axios.get("https://fakestoreapi.com/products")
      
        setLoading(false);
        
    }, [])



    return { loading, data }
}

export default useFetch
