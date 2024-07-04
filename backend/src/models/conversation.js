let mongoose = require("mongoose");

let converstionSchema = new mongoose.Schema({
    isGroup:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    participator: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupName: {
        type: String,
        required: function() { return this.isGroup; }
    }

});


let Conversation = mongoose.model("Conversation", converstionSchema);
module.exports = Conversation