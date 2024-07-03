let mongoose = require("mongoose");

let ChatParticipateSchema = new mongoose.Schema({

    conversation:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation"
    },

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

});



let ChatParticipate = mongoose.model("ChatParticipate", ChatParticipateSchema);
module.exports = ChatParticipate