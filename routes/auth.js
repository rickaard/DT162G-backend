const router = require('express').Router();
const Admin = require('../models/Admin');

const {loginValidation} = require('../validation');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
    // VALIDATE DATA BEFORE WE MAKE REQUEST
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF USERNAME EXISTS IN DATABASE
    const user = await Admin.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Username or password incorrect');

    // CHECK IF PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).send('Username or password incorrect'); 

    // CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(200).send(token);
});

module.exports = router;