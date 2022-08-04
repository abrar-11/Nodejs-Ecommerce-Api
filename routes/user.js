// *Importing Router from express
const router = require("express").Router();

// *Importing User Model
const User = require("../models/User");

// *Importing User Controllers
const auth = require("../controllers/AuthController");

//* Creating a User

router.post("/register", auth.register);


//* Login  User

router.post("/login", auth.login);


module.exports = router;
