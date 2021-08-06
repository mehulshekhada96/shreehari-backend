const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    items : [{type: String}],
    placeOrderDate : Date,
    invoice_Url : String,
    orderStatus: {
        type: String,
        enum : ['placed', 'confirmed', 'prepared', 'dispached', 'shipped', 'out for delivery', 'delivered']
    },
    returnOrder : {
        type: String,
        enum : ['confirmed', 'collected', 'rejected', 'recieved']
    },
    paymentMethod: {
        type: String,
        enum : ['COD', 'UPI', 'NetBanking', 'debitCard', 'creditCard']
    } 
})
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;