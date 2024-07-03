let Message =require("../models/message");
let Conversation = require("../models/conversation");;
// let ChatParticipate = require("../models/chat_praticipants")
// ChatParticipate
const { HandleAsync } = require("../uitls/asyncHandler");
const { ApiResponse } = require("../uitls/apiResponse");
const ChatParticipate = require("../models/chat_praticipants");
const mongoose = require("mongoose");




    // chat_particcipate

    // id  userId conversation               
    //  0     1       1                           
    //  1     2       1                         
    //  2     3       2
    //  3     2       2
    //  4     1       2  

    //     user
    //      1
    //      2


    //     conversation
    //      0
    //      1

    


const findOrCreateConversation = async() => {

}


const createGroup = async(users, groupName, admin) =>{
    try {
        // create group
        const newConversation = new Converstion({
            isGroup:true,
            groupName:groupName,
            admin: admin
        })

        await newConversation.save();

        for(let userId of users){
            const chatParticipate = new ChatParticipate({
                conversation: newConversation._id,
                user: userId
            });
            await chatParticipate.save();
        }

        return  newConversation

    } catch (error) {
        
    }
}


const createConversation = async () => {
    const newConversation = new Conversation({
        isGroup:false,
    })

    await newConversation.save()

    return newConversation._id
}


const sendMessage = HandleAsync(async(req, res, next) => {
    // first isGroup or not
    // if conversaation existed or not
    // if not creatae and send message
    //  goup id and userId and message


    let {sender, receiver, content, conversationId=undefined, isGroup=false } = req.body;

    console.log(sender, receiver, content, conversationId)

    // const conversationIds = await ChatParticipate.find({
    //     user: { $in: [sender, receiver] }
    // }).distinct('conversation');

    

    // console.log("ahahah",conversationIds)


    if(!false){
        
        if(!conversationId){
            let conversation_id = await createConversation();
        
            await ChatParticipate.create({ conversation: conversation_id, user: sender });
            await ChatParticipate.create({ conversation: conversation_id, user: receiver });
            const message = await Message.create({
                content: content,
                sender: sender,
                conversation: conversation_id
            });
            return res.status(200).json(new ApiResponse(200, message, "message is scucessfully sent"));
        }

        // await ChatParticipate.create({ conversation: conversationId, user: sender });
        // await ChatParticipate.create({ conversation: conversationId, user: receiver });
        console.log("hello")
        const message = await Message.create({
            content: content,
            sender: sender,
            conversation: conversationId
        });

        return res.status(200).json(new ApiResponse(200, message, "message is scucessfully sent"));

        
        
    }

})


const getCommonAggregate = () => {
    return [
        {
            $lookup: {
                from: "conversations",
                localField: "conversation",
                foreignField: "_id",
                as: "Conversation"
            }
        },
        {
            $unwind: {
                path: "$Conversation",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "messages",
                localField: "Conversation._id",
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
            $group: {
                _id: "$Conversation._id",
                isGroup: { $first: "$Conversation.isGroup" },
                createdAt: { $first: "$Conversation.createdAt" },
                groupName: { $first: "$Conversation.groupName" },
                conversation: {
                    $push: {
                        _id: "$Messages._id",
                        content: "$Messages.content",
                        sender: {
                            _id: "$Sender._id",
                            name: "$Sender.name",
                            email: "$Sender.email",
                            password: "$Sender.password", // If you need to include the password
                            __v: "$Sender.__v"
                        }
                    }
                }
            }
        }
    ];
};

const getDetail = async (req, res, next) => {
    try {
        let { conversationId } = req.body;

        if (conversationId) {
            let messages = await ChatParticipate.aggregate([
                {
                    $match: {
                        conversation: new mongoose.Types.ObjectId(conversationId)
                    }
                },
                ...getCommonAggregate()
            ]);

            return res.status(200).json(new ApiResponse(200, messages, "success"));
        } else {
            return res.status(400).json(new ApiResponse(400, null, "conversationId is required"));
        }
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
};


// const aggregation = () => {

//     return [
//         {
//             $lookup: {
//                 from: "messages",
//                 localField: "_id",
//                 foreignField: "conversation",
//                 as: "Message"
//             }  
//         },
//         {
//             $unwind: {
//                 path: "$Message",
//                 preserveNullAndEmptyArrays: true
//             }
//         },
//         {
//             $lookup:{
//                 from:"users",
//                 localField: "Message.sender",
//                 foreignField: "_id",
//                 as: "user"
//             }
//         },
//         {
//             $unwind: {
//                 path: "$user",
//                 preserveNullAndEmptyArrays: true
//             }
//         },
//         {
//             $group:{
//                 _id: "$_id",
//                 isGroup: { $first: "$Message.isGroup" },
//                 createdAt: { $first: "$Message.createdAt" },
//                 groupName: { $first: "$Message.groupName" },
//                 conversation:{
//                     $push:{
//                         _id:"$Message._id",
//                         content:"$Message.content",
//                         sender:"$user"
//                     }
//                 }
//             }
//         }
//     ]
// }

// const getDetail = async (req, res, next) => {
//     try {
//         let { conversationId } = req.body;

//         if (conversationId) {
           
//             let messages = await Conversation.aggregate([
//                 {
//                     $match:{
//                         _id: new mongoose.Types.ObjectId(conversationId)
//                     }
//                 },
//                 ...aggregation()
//             ])

//             return res.status(200).json(new ApiResponse(200, messages, "success"));
//         } else {
//             return res.status(400).json(new ApiResponse(400, null, "conversationId is required"));
//         }
//     } catch (error) {
//         return res.status(500).json(new ApiResponse(500, null, error.message));
//     }
// };




module.exports = {
    sendMessage,
    getDetail
}