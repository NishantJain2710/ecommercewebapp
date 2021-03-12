import React,{useEffect} from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import {listProducts} from '../actions/productActions'



const SearchScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products ,page, pages} = productList

    useEffect(()=>{
        dispatch(listProducts(keyword,pageNumber))
    },[dispatch,keyword, pageNumber])

    return (
        <>
        <div>
            <h2>Results for "{keyword}"</h2>
        </div>
            {
                loading ? <Loader/>: error ? (<Message variant='danger'>{error}</Message>):(
                <div className='search-row'>
                    {
                        products.map((product) => ( 
                            <div key={product._id}  >
                                <Product className='product' product = {product}/>
                            </div>
                        ))
                    }
                </div>
            )}
                
        
        <Paginate pages= {pages} page={page}  keyword={keyword ? keyword : ''}/>
        </>
    )
}

export default SearchScreen
