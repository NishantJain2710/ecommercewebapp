import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listOrdersForSeller} from '../actions/orderActions'

const OrdersForSeller = ({match,history}) => {
    const dispatch = useDispatch()

    const orderListSeller = useSelector((state) => state.orderListSeller)
    const {loading, error, orders} = orderListSeller

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const sellerId = match.params.id;

    useEffect(() =>{

        if(userInfo && userInfo.isSeller){
            dispatch(listOrdersForSeller(sellerId))
        }else{
            history.push('/login')
        }
    },[dispatch,history,userInfo,sellerId])

    return (
        <>
           <h1>Orders</h1> 
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
               <table className='table'>
                   <thead>
                       <tr>
                           <th>ID</th>
                           <th>USER</th>
                           <th>EMAIL</th>
                           <th>DATE</th>
                           <th>TOTAL</th>
                           <th>PAID</th>
                           <th>DELIVERED</th>
                           <th></th>
                       </tr>
                   </thead>
                   <tbody>
                       {loading && <Loader/>}
                       {error && <Message variant='dander'>{error}</Message>}   
                        {orders.reverse().map((order)=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td><a href={`mailto:${order.user && order.user.email}`}>{order.user && order.user.email}</a></td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>₹ {order.totalPrice}</td>
                                <td>{order.isPaid ? (order.paidAt.substring(0,10)):
                                (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                <td>{order.isDelivered ? (order.deliveredAt.substring(0,10)):
                                (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <Link to={`/order/${order._id}`}>
                                    <button className='primaryBtn'>Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                   </tbody>
               </table>
           )}
        </>
    )
}

export default OrdersForSeller
