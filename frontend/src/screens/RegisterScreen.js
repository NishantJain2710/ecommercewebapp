import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {oneTimePass, register} from '../actions/userAction' 
const RegisterScreen = ({location, history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch =useDispatch()

    const Otp = useSelector(state => state.Otp)
    const {loading:loadingMessage,error:errorMessage,successMessage} = Otp

    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo} = userRegister

    const redirect = location.search? location.search.split('=')[1] :  '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect]
    )
    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !==confirmPassword){
            setMessage('Passwords do not match')
        }else{
           dispatch(register(name,email,otp,password))
        }
    }
    const next = (e)=>{
        e.preventDefault()
        dispatch(oneTimePass(name,email))
    }   
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <form onSubmit ={submitHandler}>
                <label>Full Name</label>
                <div >
                    <input type="name" placeholder= 'YOUR NAME HERE' value= {name} onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <label>Email Address</label>
                <div>
                    <input type="email" placeholder= 'example@example.com' value= {email} onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <button onClick={next} className='primaryBtn getOtpBtn'>
                    GET OTP
                </button>
                {successMessage && <Message variant='success'>{successMessage}</Message>}
                {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
                {loadingMessage && <Loader/>}
                <label>Enter OTP</label>
                <div>
                    <input type="text" placeholder= 'Enter OTP' value= {otp} onChange={(e) => setOtp(e.target.value)}>
                    </input>
                </div>
                <label>Password</label>
                <div>
                    <input type="password" placeholder= 'Example@123' value= {password} onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <label>Confirm Password</label>
                <div >
                    <input type="password" placeholder= 'Example@123' value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <button type='submit' className='primaryBtn'>
                    Register
                </button>
            </form>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <div className= 'row'>
                Have an Account?{' '}
                <Link className='link' to={redirect? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </div>
        </FormContainer>
    )
}

export default RegisterScreen
