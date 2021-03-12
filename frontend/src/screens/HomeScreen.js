import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Category from '../components/Category'
import ProductCarousel from '../components/ProductCarousel'
import {listProducts} from '../actions/productActions'
import {listTopProducts} from '../actions/productActions'



const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    
    const productTopRated = useSelector(state => state.productTopRated)
    const {loading:loadingTopProducts, error:errorTopProducts, products:TopProduct} = productTopRated

    useEffect(() => {
       dispatch(listProducts(keyword,pageNumber))
       dispatch(listTopProducts())
    }, [dispatch,keyword, pageNumber] )
    const swipeLeft = (element) => {
        document.getElementById(element).scrollLeft -= 120;
    }
    const swipeRight = (element) => {
        document.getElementById(element).scrollLeft += 120;
    }
    
    return (
        <>
            <Meta />
            
            {!keyword ? <ProductCarousel/>: <Link to='/' className='btn btn-light'>Go Back</Link>}
            <Category/>
            <div className='name-tag'><i className="fas fa-angle-double-left"/> Top Rated Products <i className="fas fa-angle-double-right"/></div>
            {
                loadingTopProducts ? <Loader/>: errorTopProducts ? (<Message variant='danger'>{errorTopProducts}</Message>):(
            <div className='slider-container'>
                <div id='slide1' className='product-row'>
                    {TopProduct.map((product) => (
                        <div key={product._id} className='product-col'>
                            <Product className='product' product = {product}/>
                        </div>
                    ))}
                    
                </div>
                <div className='container-btn'>
                        <button onClick={()=>swipeLeft('slide1')} className='container-btn-left'><i className="fas fa-chevron-left"></i></button>
                        <button onClick={()=>swipeRight('slide1')} className='container-btn-right'><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
            )}
            
            <div className='name-tag'><i className="fas fa-angle-double-left"/> Top Deals <i className="fas fa-angle-double-right"/></div>
            
            {
                loading ? <Loader/>: error ? (<Message variant='danger'>{error}</Message>):(
            <div className='slider-container'>
                <div id='slide2' className='product-row'>
                    {products.map((product) => (
                        <div key={product._id} className='product-col'>
                            <Product className='product' product = {product}/>
                        </div>
                    ))}
                    
                </div>
                <div className='container-btn'>
                        <button onClick={()=>swipeLeft('slide2')} className='container-btn-left'><i className="fas fa-chevron-left"></i></button>
                        <button onClick={()=>swipeRight('slide2')} className='container-btn-right'><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
            )}

       </>
    )
}

export default HomeScreen
