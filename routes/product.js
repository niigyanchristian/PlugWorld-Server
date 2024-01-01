const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const Product = require('../models/product');

// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/').
get(async (req,res)=>{
    try {
        const find = await Product.find();
        if(find){
            res.send(find);
        }  
    } catch (error) {
        res.status(403).send(error);
    }
    
})
.post(async (req,res)=>{   
    try {
        const list = await new Product(req.body);
        await list.save();
        console.log("Done")
        res.send(list)
    } catch (error) {
        console.error(error)
        res.send(error.message);
    }
});

router.route('/:id').
post((req,res)=>{
    const {id} = req.params;
    Product.findByIdAndDelete(id).
    then(data=>{
        res.send(data);
    });
})


module.exports = router;

// {
//     title: title,
//     images: images,
//     price: price,
//     categoryId: category,
//     userId:userId,
//     description:description,
//     location: {
//       latitude: latitude,
//       longitude: longitude,
//     },
// }