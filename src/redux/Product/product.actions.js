import ProductTypes from './product.types'
import {auth} from './../../firebase/ultils'
import { handleAddProduct, handleDeleteProduct, handleFetchProduct } from './product.helper';
import userTypes from '../User/user.types';

export const addProductStart =({
    productCategory,
    productName,
    productThumbnail,
    productPrice   
}) => async dispatch =>{

  try {
  
      const timeStamp = new Date();
     
      await handleAddProduct({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productAdminUID: auth.currentUser.uid,
        createdDate :timeStamp
      });
      
       
  } catch (error) {
    //  console.log(error);
  }
};

export const fetchProductStart =(filters={})=> async dispatch =>{

    try {
        
        const products = await handleFetchProduct(filters);

        dispatch({
            type : ProductTypes.SET_PRODUCT,
            payload : products
        })


    } catch (error) {
        console.log(error);
    }
}

export const deleteProductStart = documentID => async dispatch=>{
 if(!documentID) return;
 
 
   try{
     await handleDeleteProduct(documentID);

  }catch(error){
    console.log(error);
  }
}

