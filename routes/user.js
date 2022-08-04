// *Importing Router from express
const router = require("express").Router();


// Auth Middlewares

const { verifyAuthorization } = require("../middleware/authenticate");

// *Importing User Model
const User = require("../models/User");

// *Importing User Controllers
const auth = require("../controllers/AuthController");
const userRoute = require("../controllers/UserController");

//* Creating a User

router.post("/register", auth.register);


//* Login  User

router.post("/login", auth.login);



//* Login  User

router.put("/:id",verifyAuthorization,  userRoute.update);






module.exports = router;
