import React from 'react'
import ProductTypes from './product.types';


const INITIAL_STATE ={
    productData :null,
    products: []
}

const productReducer = (state=INITIAL_STATE,action ) => {

                switch (action.type) {
                    case ProductTypes.ADD_NEW_PRODUCT:
                        return{
                            ...state,
                            productData: action.payload
                        }
                    case ProductTypes.SET_PRODUCT:
                        return{
                            ...state,
                            products: action.payload
                        }
                               
                        
                
                    default:
                        return state;
                }


}

export default productReducer
