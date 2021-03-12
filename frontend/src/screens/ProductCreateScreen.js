import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import {
    CategoryNames,
    Fashion,
    Home,
    beautyToysAndMore,
    Appliances,
    Electronics
} from '../data/categories'
const ProductCreateScreen = ({match, history}) => {

    const sellerId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [countInStock, setCountInStock] = useState(0)

    const dispatch = useDispatch()


    const productCreate =useSelector((state)=> state.productCreate)
    const {loading: loadingCreate, error:errorCreate, success: successCreate} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin



    useEffect(()=>{
        if(userInfo && userInfo.isSeller){
            if(successCreate){
                dispatch({type: PRODUCT_CREATE_RESET})
                history.push(`/seller/${sellerId}/productlist`)
            }
        }else{
            history.push('/login')
        }
    },[userInfo, successCreate, dispatch,history, sellerId])


    const uploadFileHandler = async(e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        try{
            const config={
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data} = await axios.post('/api/upload',formData,config)
            setImage(data)
            setUploading(false)
        }catch(error){
            console.log(error)
            setUploading(false)
        }
    }

    
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(createProduct(
            {
                name,
                price,
                image,
                brand,
                category,
                subCategory,
                description,
                countInStock
            }
        ))
    }
    return (
        <>
            <Link to={`/seller/${sellerId}/productlist`} className='primaryBtn'>
                Go Back
            </Link>
        <FormContainer>
            <h1>Create Product</h1>
                <form onSubmit ={submitHandler}>
                <label>Name</label>
                <div>
                    <input type="name" placeholder= 'Enter Name' value= {name} onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <label>Price</label>
                <div>
                    <input type="number" placeholder= 'Enter Price' value= {price}  onChange={(e)=> setPrice(e.target.value)}>
                    </input>
                </div>

                <label>Image</label>
                <div>
                    <input type="text" placeholder= 'Enter image URL' value= {image}  onChange={(e)=> setImage(e.target.value)}>
                    </input>
                    <input type='file' id='image-file' label='Choose File' onChange={uploadFileHandler}></input>
                    {uploading && <Loader/>}
                </div>

                <label>Brand</label>
                <div>
                    <input type="text" placeholder= 'Enter Brand' value= {brand}  onChange={(e)=> setBrand(e.target.value)}>
                    </input>
                </div>

                <label>Count In Stock</label>
                <div>
                    <input type="number" placeholder= 'Enter countInStock' value= {countInStock}  onChange={(e)=> setCountInStock(e.target.value)}>
                    </input>
                </div>

                <label>Category</label>
                <div>
                    <select value = {category} onChange={(e)=> setCategory(e.target.value)}>
                        <option value=''>Select Category</option>
                        {   
                            CategoryNames.map(category=>(
                                <option key={category.link} value = {category.link}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <label>Subcategory</label>
                <div>
                    <select value= {subCategory} onChange={(e)=> setSubCategory(e.target.value)}>
                    <option value=''>Select Subcategory</option>
                       {category === 'fashion' && Fashion.map(Fashion=>(<option key={Fashion.link} value = {Fashion.link}>{Fashion.name}</option>))}
                       {category === 'home' && Home.map(Home=>(<option key={Home.link} value = {Home.link}>{Home.name}</option>))}
                       {category === 'beauty-toys-and-more' && beautyToysAndMore.map(beautyToysAndMore=>(<option key={beautyToysAndMore.link} value = {beautyToysAndMore.link}>{beautyToysAndMore.name}</option>))}
                       {category === 'appliances' && Appliances.map(Appliances=>(<option key={Appliances.link} value = {Appliances.link}>{Appliances.name}</option>))}
                       {category === 'electronics' && Electronics.map(Electronics=>(<option key={Electronics.link} value = {Electronics.link}>{Electronics.name}</option>))}
                    </select>
                </div>

                <label>Description</label>
                <div>
                    <input type="text" placeholder= 'Enter Description' value= {description}  onChange={(e)=> setDescription(e.target.value)}>
                    </input>
                </div>
                {loadingCreate && <Loader/>}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}  
                <button type='submit' className='primaryBtn'>Create</button>
            </form>
        </FormContainer>
        </>
    )
}

export default ProductCreateScreen
