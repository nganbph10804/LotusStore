import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { addToCartStart } from '../../../redux/Cart/cart.actions'
import Button from './../../Forms/Button'
const Product = (product) => {
    const dispatch = useDispatch();
    const {
        documentID,
        productName,
        productThumbnail,
        productPrice
    } = product;
const history = useHistory();
const configAddCartBtn = {
    type : 'button'
}
    if(!documentID || !productName || !productThumbnail ||
        typeof productPrice === 'undefined') return null;

        const handleAddToCart =(productt)=>{
            if(!productt) return;
            dispatch(addToCartStart(productt))
            history.push("/cart");
        };

    return (
        <div className="product">
            <div className="thumb">
                <Link to={`/product/${documentID}`}>
                < img style={{height:'220px'}} src={productThumbnail} alt={productName}/>
                </Link>
            </div>

            <div >
                <ul style={{padding:0}} >
                    <li style={{margin:"10px 0"}}>
                        <span className="name">
                        <Link to={`/product/${documentID}`}>
                            {productName}
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                           $ {productPrice}
                        </span>
                    </li>
                    <li>
                        <div style={{marginTop:'10px',width:''}} className="addToCart">
                        <Button {...configAddCartBtn} onClick={()=>handleAddToCart(product)}>
                            Add to cart
                        </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Product
