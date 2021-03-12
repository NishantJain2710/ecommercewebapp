import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions'


const CartScreen = ({match,location, history}) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch, productId,qty])

    const removeFromCartHandler = (id)=> {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () =>{
        history.push('/login?redirect=shipping')
    }
    return (
        <div className='grid-container'>
            <div className='grid-item-1'>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your Cart Is Empty !! <Link to ='/'>Go Back</Link></Message> : (
                    <ul>
                        {
                            cartItems.map(item => (
                                <li key = {item.product}>
                                    <div className='cart-row'>
                                        <div className='row-item-1'>
                                            <img src = {item.image} alt={ item.name} />
                                        </div>
                                        <div className='row-item-2'>
                                            <Link to = {`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div className='row-item-3'>₹ {item.price}</div>
                                        <div className='row-item-4'>
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                   { [...Array(item.countInStock).keys()].map(x=>(
                                                        <option key = {x+1} value = {x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))
                                                    }
                                                </select>
                                        </div>
                                        <div className='row-item-5'>
                                            <button type ='button' className='primaryBtn' onClick={()=> removeFromCartHandler(item.product)}>
                                                <i className = 'fas fa-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>
            <div className='grid-item-2'>
                <div className='card'>
                    <ul variant='flush'>
                        <li>
                            <h2>Subtotal ({cartItems.reduce((acc, item)=> acc + item.qty, 0)}) Items</h2>
                            ₹ {cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </li>
                        <li>
                            {cartItems.length ===0 ? 
                                (<button type='button' className='blockBtn' disabled onClick={checkoutHandler}> 
                                    Proceed To Checkout
                                </button> 
                                ):
                                (<button type='button' className='primaryBtn' disabled={ cartItems.length ===0} onClick={checkoutHandler}> 
                                Proceed To Checkout
                            </button>)
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
