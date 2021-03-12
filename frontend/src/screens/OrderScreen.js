import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import{ Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails,payOrder,deliverOrder} from '../actions/orderActions' 
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({match,history}) => {
    const orderId = match.params.id
    
    const [sdkReady,setSdkReady] = useState(false)

    const dispatch = useDispatch()
    
    const orderDetails = useSelector((state) => state.orderDetails)
    const{order, loading, error} = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const{loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const{loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const{userInfo} = userLogin


    
    if(!loading){
        order.itemsPrice = order.orderItems.reduce((acc,item)=> acc + item.price * item.qty, 0)
    }

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        const addPayPalScript = async () =>{
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay ||order._id !==orderId || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.payal)
            addPayPalScript()
        }else{
            setSdkReady(true)
        }
    },[dispatch,orderId, successPay,successDeliver, order,history, userInfo])

    
    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>:
    <>
        <h1>Order {order._id}</h1>
        <div className='row-PlaceOrderScreen'>
            <div  className='col-PlaceOrderScreen-1'>
                <ul>
                    <li>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:  </strong>{order.user.name}
                        </p>
                        <p>    
                            <strong>Email: </strong><a href= {`mailto: ${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address : </strong>
                            {order.shippingAddress.houseNumber}
                            {' '}
                            {order.shippingAddress.streentNumber}, 
                            {' '}  
                            {order.shippingAddress.landmark},
                            {' '}  
                            {order.shippingAddress.city}, 
                            {' '}  
                            {order.shippingAddress.state}, 
                            {' '}  
                            {order.shippingAddress.country}, 
                            {' '}  
                            {order.shippingAddress.pincode}
                        </p>
                        {order.isDelivered ? (<Message variant='success'>Delivered on {order.deliveredAt.substring(0,10)}</Message>):
                        <Message variant='danger'>Not Delivered</Message>}
                    </li>

                    <li>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (<Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message>):
                        <Message variant='danger'>Not Paid</Message>}
                    </li>

                    <li>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Order is empty</Message>:
                            (<ul>{order.orderItems.map((item,index)=>
                                
                                <li key={index}>
                                    <div className='placeOrder-row'>
                                        <div className='placeOrder-row-item-1'>
                                            <img src={item.image} alt={item.name} fluid rounded />
                                        </div>
                                        <div className='placeOrder-row-item-2'>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className='placeOrder-row-item-3'>
                                            {item.qty} x ₹ {item.price} = ₹ {item.qty * item.price}
                                        </div>
                                    </div>
                                </li>    
                            )}</ul>)
                        }
                    </li>
                </ul>
            </div>
            <div className='col-PlaceOrderScreen-2'>
                <div className='card'>
                    <ul>
                        <li>
                            <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className='row-2'>
                                <div className='col-1'>Items:</div>
                                <div className='col-2'>₹ {order.itemsPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row-2'>
                                <div className='col-1'>Shipping:</div>
                                <div className='col-2'>₹ {order.shippingPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row-2'>
                                <div className='col-1'>Tax:</div>
                                <div className='col-2'>₹ {order.taxPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row-2'> 
                                <div className='col-1'>Total Price:</div>
                                <div className='col-2'>₹ {order.totalPrice}</div>
                            </div>
                        </li>
                        {!order.isPaid && (
                            <li>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? <Loader/>: (<PayPalButton amount = {order.totalPrice} onSuccess = {successPaymentHandler}/>)}
                            </li>
                        )}

                        {loadingDeliver && <Loader/>}


                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                            <li>
                                <button type='button' className='primaryBtn' onClick={deliverHandler}>Mark As Delivered</button>
                            </li>
                        )}
                    </ul> 
                </div>
            </div>
        </div>
    </>
}

export default OrderScreen
