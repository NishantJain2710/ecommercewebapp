import React,{useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { listProductsBySubcategory } from '../actions/productActions'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

    

const CategoryScreen = ({match}) => {

    const subCategory = match.params.subcategory
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()
    const productListBySubcategory = useSelector(state => state.productListBySubcategory)
    const { loading, error, products,page, pages } = productListBySubcategory

    useEffect(() => {
        dispatch(listProductsBySubcategory(subCategory,pageNumber))
    }, [dispatch,subCategory, pageNumber] )



    return (
        <div>
            {
                loading ? <Loader/>: error ? (<Message variant='danger'>{error}</Message>):(
                <div>
                    {products.length === 0 ? (<Message variant='danger'>Products are not available under this category</Message> ):( 
                        
                    <div className='row-grid'>
                        <h1>CATEGORY : {products[0].subCategory.toUpperCase()}...</h1>
                    {products.map((product) => (
                        <div className='col-grid' key = {product._id}>
                            <Product product = {product}/>
                        </div>
                    ))}
                    <Paginate pages= {pages} page={page} />
                    </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CategoryScreen
