import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

//import SHOP_DATA from '../shop-data.js'

//import { UserContext } from "./user.context";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children })=>{
    const [ categoriesMap, setCategoriesMap ] = useState({})

    //Manual implementation
    // useEffect(() => {
    //   addCollectionAndDocuments("categories",SHOP_DATA)
    // }, [])

    useEffect(() => {
      const getCategoriesMap = async ()=>{
        const categoryMap = await getCategoriesAndDocuments()
        console.log(categoryMap)
        setCategoriesMap(categoryMap)
      }
      getCategoriesMap()
    }, [])
    
    
    const value = { categoriesMap }
    return(
        <CategoriesContext.Provider value={value} >
            {children}
        </CategoriesContext.Provider>
    )
}