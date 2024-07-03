const nodemailer = require("nodemailer");
const User = require("../models/user");
const { generateForgotPasswordToken } = require("./jwtHandler");
 
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "79e46b6208f147",
      pass: "3d0c48267ceee1"
    }
  });

async function sendPasswordResetEmail(email, title) {

    let user = await User.findOne({
        email
    })

    if(!user){
        
       return 

    }

    let foregetToken = await generateForgotPasswordToken(email);
    let addedTime =  Date.now() + 15 * 60 * 60

    user.forgotPasswordToken = foregetToken;
    user.forgotPasswordTokenExpiry = addedTime;
    await user.save()


    const info = await transport.sendMail({
        from: "gyatz@gmail.com", 
        to: email, 
        subject: title,
        html: "<b>Hello world?</b>", 
      });

    return info  
}

module.exports = {
    sendPasswordResetEmail
}
