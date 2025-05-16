// server/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
    }],
    status: { type: String, enum: ['Pending', 'Delivered', 'Cancelled'], default: 'Pending' },
    placedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Employee who placed the order
});

module.exports = mongoose.model('Order', orderSchema);