const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const authProtection = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // verifing User token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // Get user details and setting it as req.user except user password
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (err) {
            res.status(401);
            throw new Error("Not Authorized..");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized, no Token provided ");
    }
});

module.exports = authProtection;
