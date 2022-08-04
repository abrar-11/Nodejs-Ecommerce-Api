// *Importing Router from express
const router = require("express").Router();

// *Importing User Model
const User = require("../models/User");

//* Creating a User

router.post("/register", (req, res) => {
    const user = new User(req.body);
});

module.exports = router;
