import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import OrderDetail from '../../components/OrderDetails';
import { getOrderDetails } from '../../redux/Orders/orders.action';

const Order = () => {
    const {orderID}= useParams();
     const dispatch=useDispatch();
    useEffect(() => {
       
        dispatch(
            getOrderDetails(orderID)
        );

       
    }, [])

    const OrderData=useSelector(state=>state.orderHistory.orderDetails);
    const {orderTotal}= OrderData;
    return (
        <div>
            <h1>Order ID: #{orderID} </h1>
            <OrderDetail order={OrderData}/>
            <h3>Total: {orderTotal}</h3>
        </div>
    )
}

export default Order
