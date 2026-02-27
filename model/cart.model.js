const mongoose = require("mongoose");

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
  productSize: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL"],
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
