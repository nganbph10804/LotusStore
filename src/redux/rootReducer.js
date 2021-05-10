import {combineReducers} from 'redux';
import productReducer from './Product/product.reducer';
import userReducer from './User/user.reducer';




export default combineReducers({
    user: userReducer,
    product: productReducer
});