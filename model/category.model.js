const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryField: {
    type: String,
    enum: ["Men", "Women", "Child", "Men Sport", "Women Sport"],
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
