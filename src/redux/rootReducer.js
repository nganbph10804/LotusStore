import {combineReducers} from 'redux';
import cartReducer from './Cart/cart.reducer';
import productReducer from './Product/product.reducer';
import userReducer from './User/user.reducer';




export default combineReducers({
    user: userReducer,
    product: productReducer,
    cartData : cartReducer
});