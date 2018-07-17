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
    user.save((err, registeredUser) => {
        if (err) throw err;
        return res.status(200).send(registeredUser);
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send('Invalid email.');
        }
        else {
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password.');
            }
            else {
                res.status(200).send(user);
            }
        }
    })
})

module.exports = router;