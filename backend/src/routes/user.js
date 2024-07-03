const express = require('express');
const { CreateUser, Login , ForgetPassword, ResetPassword, VerifyForgetToken} = require('../controllers/userControllers');



let route = express.Router();
route.post("/login", Login);
route.post("/register", CreateUser);
route.post("/forget-password", ForgetPassword)
route.post("/reset-password", ResetPassword)
route.post("/verify-token", VerifyForgetToken)


module.exports = route

