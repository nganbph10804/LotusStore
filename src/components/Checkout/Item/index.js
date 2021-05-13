import React from 'react'
import { useDispatch } from 'react-redux';
import { removeCartItem,addToCartStart, reducerCartItem } from '../../../redux/Cart/cart.actions';

const Item = (product) => {
    const dispatch = useDispatch();
    const {
        productName,
        productThumbnail,
        productPrice,
        quantity,
        documentID
    } = product;

    const handleRemoveCartItem = (pro) =>{
        dispatch(
            removeCartItem(pro)
        );
    }
    const handleAddProduct =(pro)=>{
            dispatch(addToCartStart(pro))
    }
    const handleReduceProduct =(pro)=>{
        dispatch(reducerCartItem(pro))
}

    return (
        <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail} alt={productName}/>
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span className="removeBtn" onClick={()=>handleReduceProduct(product)} >{`< `}</span>
                       <span>{quantity}</span>
                       <span className="removeBtn" onClick={()=>handleAddProduct(product)}>{` >`}</span>
                    </td>
                    <td>
                        $ {productPrice}
                    </td>
                    <td align="center">
                        <span className="removeBtn" onClick={()=>handleRemoveCartItem(product)}>
                            x
                        </span>
                    </td>
                </tr>
            </tbody>
            
        </table>
    )
}

export default Item
