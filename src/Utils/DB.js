const mongoose = require("mongoose");

const mongoDB_URL ="mongodb+srv://umar30qasim:ecommerce123@cluster0.zozeeyj.mongodb.net/ecommerce-cloth-store?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("Something went wrong, DB connection failed: ", err);
    process.exit(0);
  }
};

module.exports = connectDB;