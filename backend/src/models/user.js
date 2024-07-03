var mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
   
    password:{
        type:String,
        required:true
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.model("User", UserSchema);

module.exports = 
    User
