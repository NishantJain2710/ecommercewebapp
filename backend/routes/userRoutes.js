import express from 'express'
import { 
    authUser,
    getUserProfile, 
    registerUser, 
    updateUserProfile,
    getUsers, 
    deleteUser,
    getUserById,
    updateUser,
    otpValidation,
} from '../controllers/userController.js'
import { protect ,admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router
    .route('/')
    .post(registerUser)
    .get(protect,admin, getUsers)

router.post('/login', authUser)

router.post('/otpconfirmation',otpValidation)
router
    .route('/profile')
    .get(protect,getUserProfile)

router
    .route('/profile')
    .put(protect,updateUserProfile)

router
    .route('/:id')
    .delete(protect,admin,deleteUser)
    .get(protect,admin, getUserById)
    .put(protect, admin, updateUser)



export default router