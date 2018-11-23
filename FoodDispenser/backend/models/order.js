const mongoose = require('mongoose');

const oderSchema = mongoose.Schema({
  productID: { type: String, required: true },
  amount: { type: String, required: true }
  // time:
});

module.exports = mongoose.model('Order', orderSchema);
