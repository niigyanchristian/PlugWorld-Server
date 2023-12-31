const express = require('express');
const Order = require('../models/order');
const { sendMail } = require('../hooks/emailFunction');
const Product = require('../models/product');
const router = express.Router();

router.route('/').
get(async (req,res)=>{
    Order.find().
    then(results=>results.filter(order => order.served === false)).
    then(orders=>res.send(orders)).
    catch((e)=>console.error(e));
})
.post(async (req,res)=>{   
    const orderItem = await new Order(req.body);
    await orderItem.save();

    const productItem = await Product.findById(orderItem.productId)

    sendMail(orderItem,productItem)
    res.send(orderItem)
});
router.route('/:orderId')
.post(async (req,res)=>{
    const {orderId} = req.params;
    await Order.findByIdAndUpdate(orderId,{served:true});
    Order.find().
    then(results=>results.filter(served => served.served === false)).
    then(orders=>res.send(orders)).
    catch((e)=>console.error(e))
});

module.exports = router;