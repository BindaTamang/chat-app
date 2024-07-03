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
    groupName: {
        type: String,
        required: function() { return this.isGroup; }
    }

});


let Conversation = mongoose.model("Conversation", converstionSchema);
module.exports = Conversation