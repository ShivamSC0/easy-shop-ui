const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  isTrend: Boolean,
  rating: Number,
  reviews: Number,
  stock: Number,
  sizes: [String],
  colors: [String]
});

module.exports = mongoose.model("Product", productSchema);