import React from 'react'
import Button from './../../Forms/Button'
const Product = ({productName,
    productThumbnail,
    productPrice}) => {

const configAddCartBtn = {
    type : 'button'
}

    return (
        <div className="product">
            <div className="thumb">
                < img style={{height:'220px'}} src={productThumbnail} alt={productName}/>
            </div>

            <div classNam="details">
                <ul style={{padding:0}} >
                    <li style={{margin:"10px 0"}}>
                        <span className="name">
                            {productName}
                        </span>
                    </li>
                    <li>
                        <span className="price">
                           $ {productPrice}
                        </span>
                    </li>
                    <li>
                        <div style={{marginTop:'10px',width:''}} className="addToCart">
                        <Button {...configAddCartBtn}>
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
