let Message =require("../models/message");
let Conversation = require("../models/conversation");;
const {ApiError} = require('../uitls/apiError');
const { HandleAsync } = require("../uitls/asyncHandler");
const { ApiResponse } = require("../uitls/apiResponse");
// const ChatParticipate = require("../models/chat_praticipants");
const mongoose = require("mongoose");



const serachOrCreateConversation = HandleAsync(async(req, res, next) => {


    let {sender, receiver} = req.query;
    let conversation = await Conversation.findOne({
        isGroup:false,
        participator:{$in:[sender, receiver]}
    })
    // if exist fetch all the deatils
    if(conversation){
        return res.status(200).json(new ApiResponse(200, conversation, "message is scucessfully sent"));
    }

    let newConversation = new Conversation({
        isGroup:false,
        participator:[sender, receiver]
    })

    let c = await newConversation.save()
    return res.status(200).json(new ApiResponse(200, c, "message is scucessfully sent"));



})


const sendMessage = HandleAsync(async(req, res,next) => {
    let {sender, receiver, conversationId, content} = req.body;


    let conversation = await Conversation.findById(conversationId);

    if(!conversation){
        return next(new ApiError(401, "this conversation desent exist"))
    }
    const message = await Message.create({
        content: content,
        sender: sender,
        conversation: conversationId
    });

    return res.status(200).json(new ApiResponse(200, message, "message is scucessfully sent"));


})


const getCommonAggregate = () => {
    return [
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "conversation",
                as: "Messages"
            }
        },
        {
            $unwind: {
                path: "$Messages",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "Messages.sender",
                foreignField: "_id",
                as: "Sender"
            }
        },
        {
            $unwind: {
                path: "$Sender",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group:{
                _id: "$_id",
                // isGroup:"$isGroup",
                isGroup: { $first: "$Conversation.isGroup" },
                createdAt: { $first: "$Conversation.createdAt" },
                groupName: { $first: "$Conversation.groupName" },
                conversation:{
                        $push: {
                        _id: "$Messages._id",
                        content: "$Messages.content",
                        sender: {
                            _id: "$Sender._id",
                            name: "$Sender.name",
                            email: "$Sender.email",
                            password: "$Sender.password", 
                            __v: "$Sender.__v"
                        }
                    }
                }
            }
        }
        // {
        //     $group: {
        //         _id: "$Conversation._id",
        //         isGroup: { $first: "$Conversation.isGroup" },
        //         createdAt: { $first: "$Conversation.createdAt" },
        //         groupName: { $first: "$Conversation.groupName" },
        //         conversation: {
        //             $push: {
        //                 _id: "$Messages._id",
        //                 content: "$Messages.content",
        //                 sender: {
        //                     _id: "$Sender._id",
        //                     name: "$Sender.name",
        //                     email: "$Sender.email",
        //                     password: "$Sender.password", // If you need to include the password
        //                     __v: "$Sender.__v"
        //                 }
        //             }
        //         }
        //     }
        // }
    ];
};

const getDetail = HandleAsync(async(req, res, next) => {
    let {conversationId} = req.query;
    let conversation = await Conversation.findById(conversationId);

    if(!conversation){
        return next(new ApiError(401, "this conversation desent exist"))
    }

    let messages = await Conversation.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(conversationId)
            }
        },
        ...getCommonAggregate()
    ]);

    return res.status(200).json(new ApiResponse(200, messages, "success"));

})



module.exports = {
    sendMessage,
    getDetail,
    serachOrCreateConversation
}