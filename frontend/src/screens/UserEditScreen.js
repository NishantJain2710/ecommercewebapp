import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getUserDetails,updateUser} from '../actions/userAction'
import{USER_UPDATE_RESET} from '../constants/userConstants' 
const UserEditScreen = ({match, history}) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSeller, setIsSeller] = useState(false)

    const dispatch =useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate ,error: errorUpdate, success : successUpdate} = userUpdate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{

        if(userInfo && userInfo.isAdmin){
            if(successUpdate){
                dispatch({type: USER_UPDATE_RESET })
                history.push('/admin/userlist')
            }else{
                if(!user.name || user._id !== userId){
                    dispatch(getUserDetails(userId))
                }else{
                     setName(user.name)
                     setEmail(user.email)
                     setIsAdmin(user.isAdmin)
                     setIsSeller(user.isSeller)
                }
            }
        }else{
            history.push('/login')
        }

        
    },[user,userInfo,dispatch,userId, successUpdate,history])
    const submitHandler = (e)=>{
        e.preventDefault()
       dispatch(updateUser({_id: userId,name,isAdmin, isSeller}))
    }
    return (
        <>
            <Link to='/admin/userlist' className='infoBtn'>
            <i className="fas fa-angle-left"></i> Go Back
            </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader/> }
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
            {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>: (
                <form onSubmit ={submitHandler}>
                <div>
                    <label>Full Name</label>
                    <input type="name" placeholder= 'YOUR NAME HERE' value= {name} onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Email Address</label>
                    <input type="email"  value= {email}  disabled>
                    </input>
                </div>

                <div>
                    <label>Is Admin</label>
                    <input type="checkbox"  checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
                    </input>
                </div>

                <div>
                    <label>Is Seller</label>
                    <input type="checkbox"  checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)}>
                    </input>
                </div>

                <button type='submit' className='primaryBtn'>Update</button>
            </form>
            )}
        </FormContainer>
        </>
    )
}

export default UserEditScreen
