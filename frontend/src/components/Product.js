import React from 'react'
import{Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    return (
        <div className='card'>
            <Link to={`/product/${product._id}`}>
                <img className='card-image' src={product.image} alt={product.name}/>
            </Link>
            <div >
                <Link to={`/product/${product._id}`}>
                    <div className='card-title'>
                        <strong>{product.name}</strong>
                    </div> 
                </Link>
                <div className='card-text'>
                ₹ {product.price}
                </div>
                <div className='card-text '>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </div>
            </div>
        </div>
    )
}

export default Product;
