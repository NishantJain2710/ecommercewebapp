import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <form onSubmit ={ submitHandler}>
                <div>
                    <h2>Select Method</h2>      
                    <div >
                        <div className='checkBox'>
                            <input 
                                type='radio'
                                name='paymentMethod' 
                                id='PayPal' 
                                value = 'PayPal'
                                checked="checked"
                                onChange ={(e)=> setPaymentMethod(e.target.value)} 
                            />
                            <label htmlFor='PayPal' >PayPal or Credit Card</label>
                        </div>
                        <div className='checkBox'>
                            <input 
                                type='radio' 
                                name='paymentMethod' 
                                id='Paytm' 
                                value = 'Paytm'
                                onChange ={(e)=> setPaymentMethod(e.target.value)} 
                            /><label htmlFor='PayPal' >Paytm</label>
                            
                            
                        </div>
                </div>
                </div>
                <button type='submit' className='primaryBtn'>Continue</button>        
            </form>        
        </FormContainer>
    )
}

export default PaymentScreen
