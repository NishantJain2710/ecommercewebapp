import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userAction' 
const LoginScreen = ({location, history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch =useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} = userLogin

    const redirect = location.search? location.search.split('=')[1] :  '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect]
    )
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <form  onSubmit ={submitHandler}>
                <label>Email Address </label>
                <div>
                    <input type="email" placeholder= 'example@example.com' value= {email} onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>

                <label>Password </label>
                <div>
                    <input type="password" placeholder= 'Example@123' value= {password} onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <button type='submit' className='primaryBtn'>
                    Sign In
                </button>
            </form>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <div className= 'row'>
                    New Customer ?{' '}
                    <Link className='link' to={redirect? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </div>
        </FormContainer>
    )
}

export default LoginScreen
