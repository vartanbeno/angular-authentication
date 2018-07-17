const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users');

const url = 'mongodb://test:test123@ds139921.mlab.com:39921/angular-auth-events';

mongoose.connect(url, err => {
    if (err) throw err;
    console.log('Connected to mongoDB');
})

router.get('/', (req, res) => {
    res.send('Hello from API route');
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) throw err;
        return res.status(200).send(registeredUser);
    })
})

module.exports = router;