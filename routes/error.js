const express = require('express');
const ErrorMeassaging = require('../models/error');
const router = express.Router();

router.route('/').
post(async (req,res)=>{
    await ErrorMeassaging.create(req.body);  
});


module.exports = router;