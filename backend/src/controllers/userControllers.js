const User = require('../models/user');
const { encryptedPassword, decryptPassword } = require('../middleware/jwtHandler');
// const { ApiResponse } = require('../utils/apiResponse');
const {sendPasswordResetEmail} = require("../middleware/resetEmail");
const { HandleAsync } = require('../uitls/asyncHandler');
const {ApiError} = require('../uitls/apiError');
const { ApiResponse } = require('../uitls/apiResponse');



 const CreateUser = HandleAsync(async(req, res, next) => {
    let {name, email, password} = req.body;
    console.log(name, email)
    let user = await User.findOne({
        email
    })
    console.log(user, User)
    if(user){
        return next(new ApiError(401, "user already existed"))
    }
    let hashedPassword = await encryptedPassword(password);
    console.log("hash password", hashedPassword)
    let newUser = new User ({
        email,
        name,
        password:hashedPassword
    })

    let savedUser = await newUser.save();

    return res.status(200).json(new ApiResponse(200, savedUser, "new user created sucessfuly"))
})


 const Login = HandleAsync(async(req, res, next) => {
    let  { email, password } = req.body;

    let user = await User.findOne({
        email:email
    })

    if(!user){
       return next(new ApiError(401, "such user with email doesn't existed"))
    }
    if(!decryptPassword(user.password, password)){
        next(new ApiError(401, "password doesnt match"))
    }

    return res.status(200).json(new ApiResponse(200, user, "User login successfully"))

})


const ResetPassword = HandleAsync(async(req, res, next) => {
    let {email, password} = req.body;
    let user = await User.findOne({
        email
    })

    if(!user){
        return next(new ApiError(401, "user with such user doesnt exist"))
    }

    let updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            password:password
        },
        { new: true, runValidators: true }
    )

    return res.status(200).json(new ApiResponse(200, updatedUser, "password reset successfully"));

})


const ForgetPassword = HandleAsync(async(req, res, next) => {
    let {email} = req.body
    let emailResponse = await sendPasswordResetEmail(email, "Reset forget pasword" )
    return res.status(200).json(new ApiResponse(200, emailResponse, "check your email"));
})


const VerifyForgetToken = HandleAsync(async(req, res, next) => {
    let { query } = req.query;
    let { password } = req.body;
    console.log(query)
    // checkc qurey is vaklid orinvalid
    // check if forgotPasswordTokenExpiry is greater or samlller to current time
    let a = await User.findOne({forgotPasswordToken:query, forgotPasswordTokenExpiry: {$gt: new Date() }})
  
    let user = await User.findByIdAndUpdate(
        a._id,
        {
            password
        },
        { new: true, runValidators: true }
    )
    // after this forgotPasswordToken, forgotPasswordTokenExpiry set to undeined 
    return res.status(200).json(new ApiResponse(200, user, "password reset successfully"));
})

// password rest 
// forget password
// verify 


module.exports = {
    CreateUser,
    Login,
    ResetPassword,
    ForgetPassword,
    VerifyForgetToken
}

