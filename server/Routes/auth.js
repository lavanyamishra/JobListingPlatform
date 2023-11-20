const express = require('express');
const router = express.Router();
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


router.post("/register", async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !mobile || !email || !password) {
            return res.status(400).json({ error: "ALL FIELDS ARE COMPULSORY" });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).send({
                status: "failed",
                message: "this email user already exists",

            });
        }
        else res.send({ message: "User added sucessfully" })
        if (name && email && mobile && password) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: encryptedPassword,
                mobile,
            })
            await user.save();
        }

    }
    catch (error) {
        res.status(500).send({ status: "FAIL", message: "someting went wrong" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: "Email & Password is required" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: "Invalid Email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: "Incorrect password" });
        }
        else {
            return res.send({ message: "correct Email or password" });
        }
        // const token = await jwt.sign((user._id).toJSON(), process.env.JWT_KEY);

        // res.send({ token: token, name: user.name });

    } catch (error) {
        console.log(error);
    }
});
module.exports = router;
