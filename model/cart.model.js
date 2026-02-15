const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productQuantity: {
      type: Number,
      default: 1,
    },
});

const Cart = mongoose.model("Cart", CartSchema)
module.exports = Cart