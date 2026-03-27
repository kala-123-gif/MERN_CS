const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('./middleware');
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ msg: "User registered successfully" });

    } catch (err) {
        res.status(500).send("Server Error");
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // create token
        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });

    } catch (err) {
        res.status(500).send("Server Error");
    }
});