let bcryptjs = require("bcryptjs");
let jwt = require("jsonwebtoken");
let crypto = require("crypto")

const encryptedPassword = async (password) => {
    let hashPassword  = await bcryptjs.hash(password, 10);
    return hashPassword
}

const decryptPassword = async (password, hashPassword) => {
   return await bcryptjs.compare(password, hashPassword);
}


const generateForgotPasswordToken = async(payload) => {
    const hash = crypto.createHash('sha256');
    hash.update(payload);
    let hashPassword  = hash.digest('hex');
    return hashPassword
}

module.exports = {
    encryptedPassword,
    decryptPassword,
    generateForgotPasswordToken
}