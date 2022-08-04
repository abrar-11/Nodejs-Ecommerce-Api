const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// * Middleware to Verify user token 

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

// * Prevent others users to modify/access other person data from accessing the route except Admin  and the actual User

const verifyAuthorization = (req, res, next) => {
    authProtection(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(401);
            throw new Error("You are not alowed ..");
        }
    });
};

// * Prevent All users from accessing the route except Admin

const verifyAdmin = (req, res, next) => {
    authProtection(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(401);
            throw new Error("You are not alowed ..");
        }
    });
};

module.exports = { authProtection, verifyAuthorization, verifyAdmin };
