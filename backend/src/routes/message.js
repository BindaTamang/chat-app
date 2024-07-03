const express = require('express');
const { sendMessage, getDetail } = require('../controllers/messageControllers');



let route = express.Router();

route.post('/sendMessage', sendMessage);
route.get('/messageDetail', getDetail)




module.exports = route
