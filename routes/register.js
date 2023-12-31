const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/')
.post(async (req,res)=>{
    let {name,password,email,phone} = req.body;
    console.log('Gunshot');
    try {
        const user = await User.findOne({email:email});
        if(user){
            res.status(403).send("User with the email( "+email+" ) alredy exist");
        }else{
            const client = new User({
                name: _.upperFirst(name),
                email,
                password,
                phone
            });
            // Create token
            const token = jwt.sign(
                {client},
                process.env.TOKEN_KEY,
            );
            await client.save();
            console.log('Done!')
            res.status(200).send(token);
        }
    } catch (error) {
        res.status(401).send(error);
    }
    


    // User.findOne({email:email}, (err,user)=>{
    //     if(err){
    //         console.log('err.message->',err.message);
    //     }else{
    //         if(user){
    //             res.status(403).send("User with the email( "+email+" ) alredy exist");
    //         }else{
    //             const client = new User({
    //                 name: _.upperFirst(name),
    //                 email: email,
    //                 password:password,
    //             });
    //             // Create token
    //             const token = jwt.sign(
    //                 {client},
    //                 process.env.TOKEN_KEY,
    //             );
    //             client.save((err)=>{
    //                 if(!err){
    //                     res.status(200).send(token);
    //                 }else{
    //                     res.status(401).send("Unable to regiser user");
    //                 }
    //             });
    //         }
    //     }
    // });
});

module.exports = router;