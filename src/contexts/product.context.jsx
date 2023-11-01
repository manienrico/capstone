import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

//import SHOP_DATA from '../shop-data.js'

//import { UserContext } from "./user.context";

export const ProductsContext = createContext({
    products: [],
});

export const ProductProvider = ({ children })=>{
    const [ products, setProducts ] = useState([])

    //Manual implementation
    // useEffect(() => {
    //   addCollectionAndDocuments("categories",SHOP_DATA)
    // }, [])
    
    const value = { products }
    return(
        <ProductsContext.Provider value={value} >
            {children}
        </ProductsContext.Provider>
    )
}