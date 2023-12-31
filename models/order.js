const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    productId: {
        type:String,
        require:true,
    },
    customerId:{
        type:String,
        require:true,
    },
    customerName:{
        type:String,
        require:true,
    },
    customerNumber:{
        type:String,
        require:true,
    },
    served:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type: Date,
        default:new Date(Date.now()).toDateString()
    },
});

const Order = mongoose.models.Order || new mongoose.model("Order",orderSchema);
module.exports = Order;