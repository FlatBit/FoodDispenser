const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  productID: { type: String, required: true },
  amount: { type: String, required: true },
  time: { type: Date, required: true}
});

module.exports = mongoose.model('Order', orderSchema);
