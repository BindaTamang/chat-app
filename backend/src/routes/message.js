const express = require('express');
const { sendMessage, getDetail, serachOrCreateConversation } = require('../controllers/messageControllers');



let route = express.Router();

route.post('/sendMessage', sendMessage);
route.get('/messageDetail', getDetail)
route.get('/searchhOrCreate', serachOrCreateConversation)



module.exports = route
