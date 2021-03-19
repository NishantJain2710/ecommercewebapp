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
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailOtp, setEmailOtp] = useState('')
    const [phoneOtp, setPhoneOtp] = useState('')
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
        if(successMessage){
            document.getElementById('get-otp').setAttribute('disabled','disabled')
        }
    },[history,successMessage, userInfo, redirect]
    )
    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !==confirmPassword){
            setMessage('Passwords do not match')
        }else{
            const otp = emailOtp.concat(phoneOtp);
            dispatch(register(name,email,phoneNumber,otp,password))
        }
    }
    const next = (e)=>{
        e.preventDefault()
        dispatch(oneTimePass(name,email,phoneNumber))
    }
 
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <form onSubmit ={submitHandler}>
                <label>Full Name</label>
                <div>
                    <input type="name" placeholder= 'Your Full Name' value= {name} onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <label>Email Address</label>
                <div>
                    <input type="email" placeholder= 'example@example.com' value= {email} onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <label>Phone Number</label>
                <div>
                    <input type="tel" placeholder= '98xxxxxxxx' value= {phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}>
                    </input>
                </div>
                <button onClick={next} id='get-otp' className='primaryBtn'>
                    GET OTP
                </button>
              
                {errorMessage &&  <Message variant='danger'>{errorMessage}</Message> }
                {loadingMessage && <Loader/>}
                {successMessage && (
                    <div>    
                        <Message variant='success'>{successMessage}</Message>
                        <div id='after-otp'>
                            <label>Enter OTP</label>
                            <div className='row-2'>
                                <div className='col-1'>
                                    <input type="text" placeholder= 'Email OTP' value= {emailOtp} onChange={(e) => setEmailOtp(e.target.value)}>
                                    </input>
                                </div>
                                <div className='col-2'>
                                    <input type="text" placeholder= 'Phone OTP' value= {phoneOtp} onChange={(e) => setPhoneOtp(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <button onClick={next} className='LinkBtn'>
                                Resend OTP
                            </button>
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
                        </div>
                    </div>
                )}
                
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
