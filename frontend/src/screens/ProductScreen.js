import React ,{ useState, useEffect} from 'react'
import moment from 'moment'
import {Link}  from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'
import Rating from '../components/Rating'
import {listProductDetails,createProductReview} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import{ PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'

const ProductScreen = ({history,match}) => 
{   
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {loading: loadingProductReview, error:errorProductReview, success: successProductReview} = productReviewCreate


    useEffect(() => {
        if(successProductReview){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id)) 
    }, [dispatch, match,successProductReview,history, userInfo] )

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment,
        }))
    }
    
    
    return (
        <>
            <Link className='primaryBtn' to='/'>Go Back</Link>   
            {loading? <Loader/> : error ? <Message variant = 'danger'>{error}</Message>:(
                <>
                <Meta title={product.name}/>
                <div className='product-screen-container'>
                    <div className='product-screen-item-1'>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className='product-screen-item-2' md={3}>
                        <ul>
                            <li>
                                <h3>{product.name}</h3>
                            </li>
                            <li>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            </li>
                            <li>
                                Price: ₹ {product.price}
                            </li>
                            <li>
                                Description: {product.description}
                            </li>
                        </ul>
                    </div>
                    <div className='product-screen-item-3'>
                        <div className='card'>
                            <ul>
                                <li>
                                    <div className='row-2'>
                                        <div className='col-1'>
                                            Price:
                                        </div>
                                        <div className='col-2'>
                                            <strong>₹ {product.price}</strong>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='row-2'>
                                        <div className='col-1'>
                                            Status:
                                        </div>
                                        <div className='col-2'>
                                            {product.countInStock>0 ? 'In Stock' : 'Out Of Stock'}
                                        </div>
                                    </div>
                                </li>

                                {product.countInStock > 0 && (
                                    <li>
                                        <div className='row-2'>
                                            <div className='col-1'>
                                                Qty:
                                            </div>
                                            <div className='col-2'>
                                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                   { [...Array(product.countInStock).keys()].map(x=>(
                                                        <option key = {x+1} value = {x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                )}

                                <div>
                                    {product.countInStock===0 ? (<button className='blockBtn' type='button' disabled  onClick= {addToCartHandler}>
                                        Add To Cart
                                    </button>):
                                    (<button className='primaryBtn' type='button' disabled ={product.countInStock===0} onClick= {addToCartHandler}>
                                    Add To Cart
                                </button>)}
                                </div>
                            </ul>
                        </div>
                    </div>
                
                

                <div className='product-screen-item-4'>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            {product.reviews.map((review) => (
                                <div key={review._id}>
                                    <div className='row-2'>
                                        <div className='col-1'>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating}/>
                                        </div>
                                        <div className='col-2'>
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <p>{moment(review.createdAt).fromNow()}</p>
                                    <hr/>
                                </div>
                            ))}
                </div>
                <div className='product-screen-item-5'>
                    <h2>Write a Customer Review</h2>
                    {successProductReview && (<Message varient='success'>Review submitted successfully</Message>)}
                    {loadingProductReview && <Loader/>}
                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                    {userInfo ? (
                        <form onSubmit={submitHandler}>
                            <div>
                                <label>Rating</label>
                                <select value={rating} onChange={(e)=> setRating(e.target.value)}>
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </select>
                            </div>
                            <div>
                                <label>Comment</label>
                                <textarea row='3' value ={comment} onChange={(e)=> setComment(e.target.value)}></textarea>
                            </div>
                            <button type='submit' className='primaryBtn'>Submit</button>
                        </form>
                    ):<Message>Please <Link to='/login'>Sign In </Link> to write a review</Message>}
                </div>
                </div>
                </>
            )}
        </>
    )
}

export default ProductScreen
