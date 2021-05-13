import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Button from './../Forms/Button'
import { fetchAProductStart } from '../../redux/Product/product.actions'
import './style.scss'
import ProductTypes from '../../redux/Product/product.types'
import { addToCartStart } from '../../redux/Cart/cart.actions'

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const {productID}= useParams();
    const product = useSelector(state=>state.product.product);
    const {
        productName,
        productThumbnail,
        productPrice,
        productDesc
    } = product;
    useEffect(()=>{
        dispatch(fetchAProductStart(productID));
           
        
        return () =>{
            dispatch({
                type : ProductTypes.SET_APRODUCT,
                payload : {}
            })
        }

    },[])

    const configAddCartBtn ={
        type :'button'
    }
    const handleAddToCart =(productt)=>{
        if(!productt) return;
        dispatch(addToCartStart(productt))
    }

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail}/>
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h2>
                            {productName}
                        </h2>
                    </li>
                    <li>
                        <span className="price">
                           $ {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddCartBtn} onClick={()=>handleAddToCart(product)}>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <div className="description">
                        <span 
                        dangerouslySetInnerHTML={{__html: productDesc}}
                        />
                        </div>
                       
                    </li>
                </ul>
            </div>
           
        </div>
    )
}

export default ProductCard
