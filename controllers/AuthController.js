const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// * =============== Register New User ===============

const register = expressAsyncHandler(async (req, res) => {
    console.log("body: ", req.body);
    const { username, email, password } = req.body;

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

// * =============== login User ===============

const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please Provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("Invalid Email");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (user && isPasswordMatch) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateJwtToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Credentials..");
    }
});

//*  generateJwtToken
const generateJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

module.exports = { register, login };
