const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.route('/').
post(async (req,res)=>{
    let {email,password} = req.body;
    try {
        const client = await User.findOne({email:email});
        console.log(client.password == password,client.password,password)
    if(client){
        if(client.password == password){
            const token = jwt.sign(
                {client},
                process.env.TOKEN_KEY,
                );
                
            res.status(200).json(JSON.stringify(token));  
        }else{
            res.status(401).send('wrong password');
        }
    }else{
        res.status(401).send("wrong credentials");
    }
    } catch (error) {
       res.status(403) .send(error)
    }

    // User.findOne({email:email},(err,client)=>{
    //     if(err){
    //         res.status(400).send(err.message);
    //     }else{
    //         if(client){
    //             if(client.password == password){
    //                 const token = jwt.sign(
    //                     {client},
    //                     process.env.TOKEN_KEY,
    //                   );
                      
    //                 res.status(200).json(JSON.stringify(token));  
    //             }else{
    //                 res.status(401).send('wrong password');
    //             }
    //         }else{
    //             res.status(401).send("wrong credentials");
    //         }
    //     }
    // });
});


module.exports = router;