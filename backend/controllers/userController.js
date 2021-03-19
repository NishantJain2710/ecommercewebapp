import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import nodemailer from 'nodemailer'
import fast2sms from 'fast-two-sms'
import {google} from 'googleapis'


async function sendMail(name,email,OTP){
    try {
    const OAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
    OAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
    const accessToken = await OAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.DEV_EMAIL ,
                clientId : process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken : accessToken
            }
        })
        
        const mailOptions = {
            from: `Nishant Jain <${process.env.DEV_EMAIL}>`,
            to: email,
            subject: 'OTP',
            text: `Hey ${name}, Email Verification OTP is ${OTP}.`
        }

        const result = await transport.sendMail(mailOptions)
        return result 
    } catch (error) {
        return error
    }
}



//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})



//@desc     generates otp
//@route    POST /api/users/otpconfirmation
//@access   Public
var OTP = ''
const otpValidation = asyncHandler(async(req,res)=>{
    const {name,email,phoneNumber} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }else if(name===''){
        res.status(401)
        throw new Error('Enter Name')
    }else if(email === '' )
    {
        res.status(401)
        throw new Error('Enter Email')
    }else if(phoneNumber===''|| phoneNumber.toString().length < 10 ){
        res.status(401)
        throw new Error('invalid Phone Number')
    }
    OTP = (Math.floor((Math.random())*(1000000-99999))+99999).toString();
    await sendMail(name,email,OTP.slice(0,3));
    var options = {authorization: process.env.SMS_API_KEY,message: `Dear Customer,OTP for Phone Number verification is ${OTP.slice(3,6)}.`,numbers:[`${phoneNumber}`]}
    await fast2sms.sendMessage(options)
    res.json(
        {
            name: name,
            email: email,
            Message:'OTP has been sent to your email address and Phone Number'
        });
})

//@desc     Register a new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async(req,res) => {
    const {name, email,phoneNumber, password, otp} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }else if(name===''){
        res.status(401)
        throw new Error('Enter Name')
    }else if(email === '' )
    {
        res.status(401)
        throw new Error('Enter Email')
    }else if(otp === ''){
        res.status(401)
        throw new Error('Enter OTP')
    }else if(OTP === ''){
        res.status(401)
        throw new Error('Generate OTP')
    }else if(password === '' )
    {
        res.status(401)
        throw new Error('Enter Password')
    }
    if(otp === OTP){
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password
        })
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid User Data')
        }
    }else{
        res.status(400)
        throw new Error('Incorrect OTP')
    }
})

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private

const getUserProfile =  asyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber:user.phoneNumber,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})



//@desc     Update user profile
//@route    PUT /api/user/profile
//@access   Private

const updateUserProfile =  asyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})



//@desc     Get all users
//@route    GET /api/users
//@access   Private/Admin

const getUsers =  asyncHandler(async(req,res) => {

    const users = await User.find({})
        res.json(users)
    
})



//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private/Admin

const deleteUser =  asyncHandler(async(req,res) => {

    const user = await User.findById(req.params.id)
        if(user){
            await user.remove()
            res.json({message: 'User removed'})
        }else{
            res.status(404)
            throw new Error('User not found')
        }
    
})


//@desc     Get user by ID
//@route    GET /api/users/:id
//@access   Private/Admin

const getUserById =  asyncHandler(async(req,res) => {

    const user = await User.findById(req.params.id).select('-password')
        if(user){
            res.json(user)
        }else{
            res.status(404)
            throw new Error('User not found')
        }
})


//@desc     Update user 
//@route    PUT /api/users
//@access   Private Admin

const updateUser =  asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user){
        user.name = req.body.name || user.name
        if(req.body.isAdmin === undefined){
            user.isAdmin
        }else user.isAdmin = req.body.isAdmin

        if(req.body.isSeller === undefined){
            user.isSeller
        }else user.isSeller = req.body.isSeller

        if(req.body.email === ''){
            user.email
        }else user.email = req.body.email

        if(req.body.phoneNumber === '' || req.body.phoneNumber.toString().length < 10){
            user.phoneNumber
        }else user.phoneNumber = req.body.phoneNumber

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: updatedUser.isSeller,
            
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})



export{
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    otpValidation

}