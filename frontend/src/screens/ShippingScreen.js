import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [houseNumber, setHouseNumber] = useState(shippingAddress.houseNumber)
    const [streetNumber, setStreetNumber] = useState(shippingAddress.streetNumber)
    const [landmark, setLandmark] = useState(shippingAddress.landmark)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [pincode, setPincode] = useState(shippingAddress.pincode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({houseNumber,streetNumber,landmark,city,state,pincode,country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>SHIPPING</h1>
            <form onSubmit ={ submitHandler}>
                <div>
                    <label>House Number</label>
                    <input type="text" placeholder= 'Enter House Number' value= {houseNumber} required onChange={(e) => setHouseNumber(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Street Number</label>
                    <input type="text" placeholder= 'Enter Street Number' value= {streetNumber} required onChange={(e) => setStreetNumber(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Landmark</label>
                    <input type="text" placeholder= 'Enter Landmark' value= {landmark} required onChange={(e) => setLandmark(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>City</label>
                    <input type="text" placeholder= 'Enter city' value= {city} required onChange={(e) => setCity(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>State</label>
                    <input type="text" placeholder= 'Enter State' value= {state} required onChange={(e) => setState(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Country</label>
                    <input type="text" placeholder= 'Enter country' value= {country} required onChange={(e) => setCountry(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Pincode</label>
                    <input type="text" placeholder= 'Enter pin code' value= {pincode} required onChange={(e) => setPincode(e.target.value)}>
                    </input>
                </div>
                <button type='submit' className='primaryBtn'>Continue</button>                
            </form>
        </FormContainer>
    )
}

export default ShippingScreen