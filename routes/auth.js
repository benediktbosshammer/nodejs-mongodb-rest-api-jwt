const express = require('express');
const User = require('../models/User');
const {registerValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);

    if (error) return res.status(400).json({
        message: error.details[0].message
    });

    const userExist = await User.findOne({name: req.body.name});
    if (userExist) return res.status(400).json({message: "Username already exists"})

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({name: req.body.name});
    if (!user) return res.status(400).send('Login failed (user)');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Login failed (password)');

    const token = jwt.sign({
        _id: user._id,
    }, process.env.TOKEN_SECRET);
    
    res.status(200).json({accessToken: token});
});

module.exports = router