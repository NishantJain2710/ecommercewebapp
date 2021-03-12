import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails,updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import {
    CategoryNames,
    Fashion,
    Home,
    beautyToysAndMore,
    Appliances,
    Electronics
} from '../data/categories'
const ProductEditScreen = ({match, history}) => {

    const productId = match.params.id

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

    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate


    useEffect(()=>{

        if(userInfo && (userInfo.isAdmin || userInfo.isSeller)){
            if(successUpdate){
                dispatch({type: PRODUCT_UPDATE_RESET})
                history.push('/admin/productlist')
            }else{
                if(!product.name || product._id !== productId){
                    dispatch(listProductDetails(productId))
                }else{
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setSubCategory(product.subCategory)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                }
            }

        }else{
            history.push('/login')
        }

       
   
    },[userInfo,product,dispatch,productId, history,successUpdate])


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
        }catch{
            setUploading(false)
        }
    }



    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateProduct(
            {
                _id:productId,
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
            <Link to={`/seller/${product.user}/productlist`} className='primaryBtn'>
                Go Back
            </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>: (
                <form onSubmit ={submitHandler}>
                <div >
                    <label>Name</label>
                    <input type="name" placeholder= 'Enter Name' value= {name} onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" placeholder= 'Enter Price' value= {price}  onChange={(e)=> setPrice(e.target.value)}>
                    </input>
                </div>

                <div>
                    <label>Image</label>
                    <input type="text" placeholder= 'Enter image URL' value= {image}  onChange={(e)=> setImage(e.target.value)}>
                    </input>
                    <input type='file' id='image-file' label='Choose File' onChange={uploadFileHandler}></input>
                    {uploading && <Loader/>}
                </div>

                <div>
                    <label>Brand</label>
                    <input type="text" placeholder= 'Enter Brand' value= {brand}  onChange={(e)=> setBrand(e.target.value)}>
                    </input>
                </div>

                <div>
                    <label>Count In Stock</label>
                    <input type="number" placeholder= 'Enter countInStock' value= {countInStock}  onChange={(e)=> setCountInStock(e.target.value)}>
                    </input>
                </div>

                <div>
                    <label>Category</label>
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
                <div>
                    <label>Subcategory</label>
                    <select value= {subCategory} onChange={(e)=> setSubCategory(e.target.value)}>
                    <option value=''>Select Subcategory</option>
                       {category === 'fashion' && Fashion.map(Fashion=>(<option key={Fashion.link} value = {Fashion.link}>{Fashion.name}</option>))}
                       {category === 'home' && Home.map(Home=>(<option key={Home.link} value = {Home.link}>{Home.name}</option>))}
                       {category === 'beauty-toys-and-more' && beautyToysAndMore.map(beautyToysAndMore=>(<option key={beautyToysAndMore.link} value = {beautyToysAndMore.link}>{beautyToysAndMore.name}</option>))}
                       {category === 'appliances' && Appliances.map(Appliances=>(<option key={Appliances.link} value = {Appliances.link}>{Appliances.name}</option>))}
                       {category === 'electronics' && Electronics.map(Electronics=>(<option key={Electronics.link} value = {Electronics.link}>{Electronics.name}</option>))}
                    </select>
                </div>

                <div>
                    <label>Description</label>
                    <input type="text" placeholder= 'Enter Description' value= {description}  onChange={(e)=> setDescription(e.target.value)}>
                    </input>
                    
                </div>

                <button type='submit' className='primaryBtn'>
                    Update
                </button>
            </form>
            )}
        </FormContainer>
        </>
    )
}

export default ProductEditScreen
