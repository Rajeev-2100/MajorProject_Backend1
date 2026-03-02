const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
