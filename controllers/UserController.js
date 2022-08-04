const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = expressAsyncHandler(async (req, res) => {
    const { username, email, password  } = req.body;
 
    if (!username || !email || !password) {
       res.status(400);
       throw new Error("Please Provide Details");
    }
 
    //   === === Checking wether user already exists or not === ===


    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
       res.status(400);
       throw new Error("User with the provided email already exists");
    }
 
    //   === === Password Hashing === ===
 
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);
 
    const user = await User.create({
       username,
       email,
       password: hashed_password,
    });
 
    if (user) {
       res.status(201).json({
          _id: user.id,
          username: user.username,
          email: user.email,
          token: generateJwtToken(user._id),
       });
    } else {
       res.status(400);
       throw new Error("Invalid User data..");
    }
 });


  
//*  generateJwtToken
 const generateJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
 };
 

 module.exports = { register };


