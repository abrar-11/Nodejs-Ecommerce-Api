const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//* UPDATE User Data

const update = expressAsyncHandler(async (req, res) => {
    if (req.body.password) {
        //   === === Password Hashing === ===

        const saltRounds = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500);
        throw new Error("Invalid Credentials");
    }
});


// Delete User Handler
const delete_user =  expressAsyncHandler(async(req,res)=>{
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(deletedUser)
        }
        catch(err){
            res.status(500)
            throw new Error("Invalid User Id..")
        }
})  

module.exports = {update};
