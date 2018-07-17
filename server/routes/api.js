const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users');

const url = 'mongodb://test:test123@ds139921.mlab.com:39921/angular-auth-events';

mongoose.connect(url, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to mongoDB')
    }
})

router.get('/', (req, res) => {
    res.send('Hello from API route');
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err);
        }
        else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            return res.status(200).send({ token });
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ username: userData.username }, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            if (!user) {
                res.status(401).send('Invalid username.');
            }
            else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password.');
                }
                else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({ token });
                }
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Kanye West",
            "description": "Concert",
            "date": "11-21-2014"
        },
        {
            "_id": "2",
            "name": "World Cup",
            "description": "Final Match",
            "date": "06-15-2018"
        },
        {
            "_id": "3",
            "name": "NBA Finals",
            "description": "Game 7",
            "date": "06-08-2018"
        },
        {
            "_id": "4",
            "name": "Ericsson Response",
            "description": "Work Event",
            "date": "06-17-2018"
        },
        {
            "_id": "5",
            "name": "Raptors @ Lakers",
            "description": "Regular Season",
            "date": "11-03-2018"
        },
        {
            "_id": "6",
            "name": "Event Name",
            "description": "Event Description",
            "date": "mm-dd-yyyy"
        }
    ]
    res.json(events);
})

router.get('/special', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Kanye West",
            "description": "Concert",
            "date": "11-21-2014"
        },
        {
            "_id": "2",
            "name": "World Cup",
            "description": "Final Match",
            "date": "06-15-2018"
        },
        {
            "_id": "3",
            "name": "NBA Finals",
            "description": "Game 7",
            "date": "06-08-2018"
        },
        {
            "_id": "4",
            "name": "Ericsson Response",
            "description": "Work Event",
            "date": "06-17-2018"
        },
        {
            "_id": "5",
            "name": "Raptors @ Lakers",
            "description": "Regular Season",
            "date": "11-03-2018"
        },
        {
            "_id": "6",
            "name": "Event Name",
            "description": "Event Description",
            "date": "mm-dd-yyyy"
        }
    ]
    res.json(events);
})

module.exports = router;