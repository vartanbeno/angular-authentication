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

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Kanye West",
            "description": "Concert",
            "data": "11-21-2014"
        },
        {
            "_id": "2",
            "name": "World Cup",
            "description": "Final Match",
            "data": "06-15-2018"
        },
        {
            "_id": "3",
            "name": "NBA Finals",
            "description": "Game 7",
            "data": "06-08-2018"
        },
        {
            "_id": "4",
            "name": "Ericsson Response",
            "description": "Work Event",
            "data": "06-17-2018"
        },
        {
            "_id": "5",
            "name": "Raptors @ Lakers",
            "description": "Regular Season",
            "data": "11-03-2018"
        },
        {
            "_id": "6",
            "name": "Event Name",
            "description": "Event Description",
            "data": "mm-dd-yyyy"
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
            "data": "11-21-2014"
        },
        {
            "_id": "2",
            "name": "World Cup",
            "description": "Final Match",
            "data": "06-15-2018"
        },
        {
            "_id": "3",
            "name": "NBA Finals",
            "description": "Game 7",
            "data": "06-08-2018"
        },
        {
            "_id": "4",
            "name": "Ericsson Response",
            "description": "Work Event",
            "data": "06-17-2018"
        },
        {
            "_id": "5",
            "name": "Raptors @ Lakers",
            "description": "Regular Season",
            "data": "11-03-2018"
        },
        {
            "_id": "6",
            "name": "Event Name",
            "description": "Event Description",
            "data": "mm-dd-yyyy"
        }
    ]
    res.json(events);
})

module.exports = router;