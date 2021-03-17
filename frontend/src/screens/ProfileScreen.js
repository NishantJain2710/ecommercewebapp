import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails,updateUserProfile} from '../actions/userAction' 
import {listMyOrders} from '../actions/orderActions' 


const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user } = userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error: errorOrders , orders } = orderListMy

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
                
            }else{
                setName(user.name)
                setEmail(user.email)
                setPhoneNumber(user.phoneNumber)
            }
        }
    },[dispatch, history, userInfo,user]
    )
    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !==confirmPassword){
            setMessage('Passwords do not match')
        }else{
           dispatch(updateUserProfile({id: user._id,name,password}))
        }
    }
    return (
        <div className='row-profile-screen'>
            <div className='col-profile-screen-3'>
                
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message> }
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader/>}
                <form onSubmit ={submitHandler}>
                    <div>
                        <label>Full Name</label>
                        <input type="name" placeholder= 'YOUR NAME HERE' value= {name} onChange={(e) => setName(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label>Email Address</label>
                        <input type="email"  value= {email} disabled>
                        </input>
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input type="tel"  value= {phoneNumber} disabled>
                        </input>
                    </div>

                    <div>
                        <label>password</label>
                        <input type="password" placeholder= 'Example@123' value= {password} onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" placeholder= 'Example@123' value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                        </input>
                    </div>
                    <button type='submit' className='primaryBtn'>Update</button>
                </form>
            </div>
            <div className='col-profile-screen-9'>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader/> : errorOrders ? <Message variant ='danger'>{errorOrders}</Message>:(
                    <table className ='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        
                            {
                            orders.map(order =>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10):(
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10):(
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            <button className='primaryBtn' >Details</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default ProfileScreen
