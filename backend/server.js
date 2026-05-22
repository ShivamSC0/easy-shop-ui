const Product = require("./models/Product");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

const products = [
  {
    id: "1",
    name: "Nike Air Max",
    brand: "Nike",
    category: "Shoes",
    price: 120,
    description: "Comfortable running shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    isTrend: true
  },
  {
    id: "2",
    name: "Apple Watch",
    brand: "Apple",
    category: "Electronics",
    price: 399,
    description: "Smart wearable device",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    isTrend: true
  },
  {
    id: "3",
    name: "Leather Jacket",
    brand: "Zara",
    category: "Fashion",
    price: 180,
    description: "Premium leather jacket",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    isTrend: false
  }
];

app.get("/", (req, res) => {
  res.send("Easy Shop API Running");
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/seed", async (req, res) => {
  await Product.insertMany([
    {
      name: "Nike Air Max",
      brand: "Nike",
      category: "Shoes",
      price: 120,
      description: "Comfortable running shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      isTrend: true,
      rating: 4.5,
      reviews: 120,
      stock: 10,
      sizes: ["7", "8", "9"],
      colors: ["Black", "White"]
    },
    {
      name: "Apple Watch",
      brand: "Apple",
      category: "Electronics",
      price: 399,
      description: "Smart wearable device",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
      isTrend: true,
      rating: 4.8,
      reviews: 220,
      stock: 5,
      sizes: ["Standard"],
      colors: ["Silver", "Black"]
    }
  ]);

  res.send("Products Seeded");
});

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});