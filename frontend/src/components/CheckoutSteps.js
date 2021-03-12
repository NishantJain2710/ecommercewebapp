import React from 'react'
import { Link} from 'react-router-dom'
const CheckoutSteps = ({step1,step2,step3,step4}) => {
    return (
        <div className='checkOut'>
            <span>
                {step1 ? (
                    <Link to='/login'>Sign In</Link>
                ): <p>Sign In</p>}
            </span>
            <span>
                {step2 ? (
                    <Link to='/shipping'>Shipping</Link>
                ):<p>Shipping</p>}
            </span>
            <span>
                {step3 ? (
                    <Link to='/payment'>Payment</Link>
                ): <p>Payment</p>}
            </span>
            <span>
                {step4 ? (
                    <Link to='/placeorder'>Place Order</Link>
                ): <p>Place Order</p>}
            </span>
        </div>
    )
}

export default CheckoutSteps
