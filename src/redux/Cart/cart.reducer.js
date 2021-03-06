
import CartTypes from './cart.types'
import {handleAddToCart,handleRemoveCartItem,hanleReduceCartItem} from './cart.utils'



const INITIAL_STATE ={
    cartItems :[]
};

const cartReducer = (state=INITIAL_STATE , action) =>{

        switch (action.type) {
            case CartTypes.ADD_TO_CART:
              return{
                  ...state,
                  cartItems : handleAddToCart({
                    prevCartItems: state.cartItems,
                    nextCartItem :action.payload
                  })
              }
            
              case CartTypes.REMOVE_CART_ITEM :
                return {
                  ...state,
                  cartItems : handleRemoveCartItem({
                    prevCartItems : state.cartItems,
                    cartItemToRemove : action.payload

                  })
                }
              case CartTypes.REDUCE_CART_ITEM :
                return {
                  ...state,
                  cartItems : hanleReduceCartItem({
                    prevCartItems : state.cartItems,
                    cartItemToReduce : action.payload
                  })
                }

            case CartTypes.CLEAR_CART:
              return{
                ...state,
                ...INITIAL_STATE
              }
        
            default:
               return state;
        }


}

export default cartReducer