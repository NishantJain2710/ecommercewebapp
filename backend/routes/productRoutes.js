import express from 'express'
const router = express.Router()

import { 
    deleteProduct, 
    getProducts, 
    getProductsById,
    createProduct,
    updateProduct, 
    createProductReview, 
    getTopProducts,
    getProductsForSeller,
    getProductsBySubCategory
} from '../controllers/productController.js'
import { protect , seller} from '../middleware/authMiddleware.js'


router.route('/').get(getProducts)
router.get('/top',getTopProducts)
router.get('/category/:subcategory',getProductsBySubCategory)
router.route('/:id').get(getProductsById).post(protect,seller,createProduct).delete(protect,seller,deleteProduct).put(protect,seller,updateProduct)
router.route('/:id/seller').get(protect,getProductsForSeller)
router.route('/:id/reviews').post(protect, createProductReview)





export default router