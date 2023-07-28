const mongoose = require("mongoose");
require('dotenv').config();
const url = "mongodb+srv://54321Boldoo:54321Boldoo@batbayr112.nndq93c.mongodb.net/shalgalt"; // MongoDB серверийн хаяг

async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("data base holbogdlo.");
    // Энд хэрэглэгчдийн ашиглах үйлдлүүдийг бичнэ.
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

module.exports = connectDB; 