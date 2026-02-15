const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  product: {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      min: 10,
      max: 200,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    deliveryCharges: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      enum: [4.2, 4.4, 4.6, 4.8],
      required: true,
    },
    productQuantity: {
      type: Number,
      default: 1,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    productDescription: {
      type: [String],
      required: true,
    },
    categoryField: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  userDetail: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  },
  addressDetail: {
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
});
