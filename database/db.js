const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectDB = async () => {
  
  return await mongoose.connect(process.env.MONGO_URL);
};

module.exports = connectDB