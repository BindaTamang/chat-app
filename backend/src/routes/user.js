const express = require('express');
const { CreateUser, Login , ForgetPassword, ResetPassword, VerifyForgetToken, getUsers} = require('../controllers/userControllers');



let route = express.Router();
route.post("/login", Login);
route.get("/users", getUsers);
route.post("/register", CreateUser);
route.post("/forget-password", ForgetPassword)
route.post("/reset-password", ResetPassword)
route.post("/verify-token", VerifyForgetToken)


module.exports = route

