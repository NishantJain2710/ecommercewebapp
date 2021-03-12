import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc     Fetch all products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async(req,res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name:{
            $regex : req.query.keyword,
            $options: 'i'
        }
    }:{}

    const count = await Product.countDocuments({...keyword})

    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1)).populate('user', 'name')
    res.json({products,page,pages:Math.ceil(count/ pageSize)})
})

//@desc     Get all products of seller
//@route    GET /api/products/:id/seller
//@access   Private/Seller

const getProductsForSeller = asyncHandler(async(req,res) => {
   
    const sellerId = req.params.id
    const products = await Product.find({user : sellerId})
    res.json({products})
})


//@desc     Fetch single products
//@route    GET /api/products/:id
//@access   Public
const getProductsById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


//@desc     Fetch all products with subCategories
//@route    GET /api/products/category/:subCategory
//@access   Public
const getProductsBySubCategory = asyncHandler(async(req,res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const subCategory = req.params.subcategory


    const count = await Product.countDocuments({'subCategory' : subCategory})

    const products = await Product.find({'subCategory' : subCategory}).limit(pageSize).skip(pageSize * (page -1)).populate('user', 'name')
    res.json({products,page,pages:Math.ceil(count/ pageSize)})
})


//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   Private/Seller
const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: 'Product removed'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


//@desc     Create a product
//@route    POST /api/products
//@access   Private/seller
const createProduct = asyncHandler(async(req,res) => {
    const user = req.params.id
    const {name,price,image,brand,category,subCategory,countInStock,description} = req.body
    const createdProduct = await Product.create({
        name,
        user,
        price,
        image,
        brand,
        category,
        subCategory,
        countInStock,
        description
    })

    if(createdProduct){
        res.status(201).json(createdProduct)
    }else{
        res.status(400)
        throw new Error('Invalid Product Data')
    }
})




//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/Seller
const updateProduct = asyncHandler(async(req,res) => {
   const {name,price,description,image,brand,category,countInStock} = req.body

    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = price
        product.image = image
        product.description = description
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc     Create new review
//@route    POST /api/products/:id/reviews
//@access   Private
const createProductReview = asyncHandler(async(req,res) => {
    const {rating, comment} = req.body
 
     const product = await Product.findById(req.params.id)
     if(product){
         const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
         if(alreadyReviewed){
             res.status(400)
             throw new Error('Product already reviewed')
         }

         const review = {
             name : req.user.name,
             rating: Number(rating),
             comment,
             user:req.user._id
         }

         product.reviews.push(review)

         product.numReviews = product.reviews.length

         product.rating = product.reviews.reduce((acc,item)=> item.rating + acc, 0) / product.reviews.length

         await product.save()
         res.status(201).json({message: 'Review added'})
     }else{
         res.status(404)
         throw new Error('Product not found')
     }
 })


//@desc     Get top rated products
//@route    GET /api/products/top
//@access   Public
const getTopProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(10)
    res.json(products)
 })


export {
    getProducts,
    getProductsById,
    getTopProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getProductsForSeller,
    getProductsBySubCategory
}