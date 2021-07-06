import React,{useState,useEffect} from 'react'
import FormInput from '../Forms/Forminput'
import Button from '../Forms/Button'
import {CountryDropdown} from 'react-country-region-selector'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/Cart/cart.actions'
import { createStructuredSelector } from 'reselect'
import { selectCartItemsCount, selectCartTotal,selectCartItems } from '../../redux/Cart/cart.selectors'
import { useHistory } from 'react-router-dom'
import { saveOrderHistory } from '../../redux/Orders/orders.action'

const initialAddress ={
    line1:'',
    line2:'',
    city:'',
    postal_code:'',
    country:'',
}

const mapState= createStructuredSelector({
    total: selectCartTotal,
    itemCount : selectCartItemsCount,
    cartItems: selectCartItems
})

const PaymentDetails = () => {

    const history= useHistory();
    const {total,itemCount,cartItems} = useSelector(mapState);

    useEffect(() => {
        if(itemCount<1)
      {
        history.push("/dashboard");
      }
    }, [itemCount])

    const [shippingAddress, setShippingAddress] = useState({...initialAddress});
    const [recipentName, setRecipentName] = useState('');
    const dispatch = useDispatch();
    const handleShipping = evt=>{
        const {name,value}=evt.target;
        setShippingAddress({
            ...shippingAddress,
            [name]:value
        });
    };


    const handleFormSubmit = async evt =>{
        evt.preventDefault();

        if(
            !shippingAddress.line1 || !shippingAddress.line2
            || !shippingAddress.postal_code 
            || !shippingAddress.country
            || !shippingAddress.city
            || !recipentName
        ){
            return;
        }
        const configOrder={
            orderTotal:total,
            orderItems: cartItems.map(item=>{
                const {documentID,productThumbnail
                ,productName,productPrice,quantity
            }=  item;
            return {
                documentID,
                productName,
                productThumbnail,
                productPrice,
                quantity
            }
            }),
            recipentCustomer:{
            customerName:recipentName,
            country: shippingAddress.country,
            postalCode: shippingAddress.postal_code,
            city: shippingAddress.city,
            addressLine1: shippingAddress.line1,
            addressLine2:shippingAddress.line2
            }
            
        }
        dispatch(
            saveOrderHistory(configOrder)
        )


        dispatch(clearCart())
        

    }

    return (
        <div className="paymentDest">
            <form onSubmit={handleFormSubmit}>
            <div className="group">
                <h3>
                    Shipping Address
                </h3>

                <FormInput 
                required
                placeholder="Recipient Name"
                name="recipentName"
                value={recipentName}
                handleChange={evt=>{setRecipentName(evt.target.value)}}
                type="text"
                />

                <div className="formRow checkoutInput">
                <CountryDropdown
                required
                onChange={val => handleShipping({
                    target:{
                        name:'country',
                        value: val
                    }
                })}
                valueType="full"
                name="country"
                value={shippingAddress.country}
                />
                </div>
                <FormInput 
                required
                placeholder="City"
                name="city"
                value={shippingAddress.city}
                handleChange={evt=>handleShipping(evt)}
                type="text"
                />

                <FormInput 
                required
                placeholder="Postal Code"
                name="postal_code"
                value={shippingAddress.postal_code}
                handleChange={evt=>handleShipping(evt)}
                type="text"
                />
                 <FormInput 
                required
                placeholder="Line1"
                name="line1"
                value={shippingAddress.line1}
                handleChange={evt=>handleShipping(evt)}
                type="text"
                />

                <FormInput 
                required
                placeholder="Line2"
                name="line2"
                value={shippingAddress.line2}
                handleChange={evt=>handleShipping(evt)}
                type="text"
                />
                 <Button type="submit">
               Place Order
           </Button>
            </div>
          
            </form>
        </div>
    )
}

export default PaymentDetails
