import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductsApi() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const res = await axios.get('api/products')
        //console.log(res.data.products)
        setProducts(res.data.products)
    }

    useEffect(()=>{
       getProducts()
    },[])


    return {
        products: [products, setProducts]
    }
}

export default ProductsApi
