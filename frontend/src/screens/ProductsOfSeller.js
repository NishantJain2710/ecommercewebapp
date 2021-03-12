import React,{useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import{Link} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {deleteProduct, listProductsBySellerId} from '../actions/productActions'


const ProductsOfSeller = ({match,history}) => {

    const dispatch = useDispatch()

    const sellerProductList = useSelector(state => state.sellerProductList)
    const { loading, error, products } = sellerProductList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error:errorDelete, success:successDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const sellerId = match.params.id
    
    

    useEffect(() => {

        if(userInfo && userInfo.isSeller){
            dispatch(listProductsBySellerId(sellerId))

        }else{
            history.push('/login')
        }

       
    }, [dispatch,userInfo,history,sellerId,successDelete] )
    
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteProduct(id))
        }
    }

    
    return (
        <>
            <Meta />

            <div className='row-productsOfSeller'>
                <div>
                  <h1>Products</h1> 
                  <Link to={`/seller/${sellerId}/createproduct`}>
                        <button className='infoBtn' >
                            <i className='fas fa-plus'></i>Create Product
                        </button> 
                    </Link>
                </div>
            </div>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PRODUCT NAME</th>
                            <th>BRAND</th>
                            <th>CATEGORY</th>
                            <th>SUBCATEGORY</th>
                            <th>STOCK</th>
                            <th>PRICE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>{product.subCategory}</td>
                                <td>{product.countInStock}</td>
                                <td>₹ {product.price}</td>
                                <td>
                                    <Link to={`/seller/product/${product._id}/edit`}>
                                    <button className='primaryBtn'><i className='fas fa-edit'></i></button>
                                    </Link>
                                    <button className = 'dangerBtn' onClick={()=> deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default ProductsOfSeller