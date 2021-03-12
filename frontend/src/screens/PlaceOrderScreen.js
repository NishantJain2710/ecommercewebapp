import React,{useEffect} from 'react'
import{ Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions' 


const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((acc,item)=> acc + item.price * item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 100 ? 10 : 20
    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const{order, success, error} = orderCreate
    

    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
        }// eslint-disable-next-line
    },[history,success])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <>
        <CheckoutSteps step1 step2 step3 step4 />
        <div className='row-PlaceOrderScreen'>
            <div className='col-PlaceOrderScreen-1' md={8}>
                <ul>
                    <li>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address : </strong>
                            {cart.shippingAddress.houseNumber}  
                            {cart.shippingAddress.streentNumber}, 
                            {cart.shippingAddress.landmark}, 
                            {cart.shippingAddress.city}, 
                            {cart.shippingAddress.state}, 
                            {cart.shippingAddress.country}, 
                            {cart.shippingAddress.pincode}
                        </p>
                    </li>

                    <li>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>{cart.paymentMethod}
                    </li>
                    <li>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your Cart is empty</Message>:
                            (<ul>{cart.cartItems.map((item,index)=>
                                <li key={index}>
                                    <div className='placeOrder-row'>
                                        <div className='placeOrder-row-item-1'>
                                            <img src={item.image} alt={item.name} />
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
                                <div className='col-1'>Items :</div>
                                <div className='col-2'>₹ {cart.itemsPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row-2'>
                                <div className='col-1'>Shipping :</div>
                                <div className='col-2'>₹ {cart.shippingPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row-2'>
                                <div className='col-1'>Tax :</div>
                                <div className='col-2'>₹ {cart.taxPrice}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row-2'>
                                <div className='col-1'>Total Price :</div>
                                <div className='col-2'>₹ {cart.totalPrice}</div>
                            </div>
                        </li>
                        <li>
                            {error && <Message variant='danger'>{error}</Message>}
                        </li>
                        <li>
                        {cart.cartItems === 0 ? (<button type='button' className='blockBtn' disabled='disabled' onClick={placeOrderHandler}>Place Order</button>):
                        (<button type='button' className='primaryBtn'  onClick={placeOrderHandler}>Place Order</button>) }
                        </li>
                    </ul> 
                </div>
            </div>
        </div>
            
        </>
    )
}

export default PlaceOrderScreen
