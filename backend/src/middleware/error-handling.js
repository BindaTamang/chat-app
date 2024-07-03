// import { ApiError } from "../utils/apiError";

const { ApiError } = require("../uitls/apiError");

// let {ApiError} = require("../utils/apiError")


const ErrorHandle = (err, req, res, next) => {
    console.log("error k aayo", err)
    if(err instanceof ApiError){
        const response  = {
            ...err,
            message:err.message
        }
        return res.status(err.code).json(response);
    }else{
        const statusCode = 400;
        return res.status(statusCode).json("server error")
        
    }
}


module.exports = {
    ErrorHandle
}