const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    dateOfSale: { type: Date, required: true },
    category: { type: String },
    sold: { type: Boolean, default: false }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
