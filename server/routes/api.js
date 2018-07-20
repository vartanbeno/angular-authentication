const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users');
const Event = require('../models/events');
const SpecialEvent = require('../models/specialEvents');

const bcrypt = require('bcryptjs');

const url = 'mongodb://test:test123@ds139921.mlab.com:39921/angular-auth-events';

mongoose.connect(url, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to mongoDB')
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

router.get('/', (req, res) => {
    res.send('Hello from API route');
})

router.post('/register', (req, res) => {
    let userData = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userData.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            else {
                let user = new User({
                    username: userData.username,
                    password: hash
                });
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
            }
        })
    })
})

router.post('/validate', (req, res) => {
    let userData = req.body;
    User.count({ username: userData.username }).then((count, err) => {
        if (err) {
            console.log(err);
        }
        else if (count > 0) {
            return res.status(409).json('Username already exists.');
        }
        else {
            return res.status(200).json('OK');
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
                bcrypt.compare(userData.password, user.password, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else if (result) {
                        let payload = { subject: user._id };
                        let token = jwt.sign(payload, 'secretKey');
                        res.status(200).send({ token });
                    }
                    else {
                        res.status(401).send('Invalid password.');
                    }
                })
            }
        }
    })
})

router.get('/events', (req, res) => {
    Event.find({}, [], { sort: { date: -1 } }, (err, events) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(events);
        }
    })
})

router.post('/events/createEvent', (req, res) => {
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date
    })
    event.save((err, event) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(event);
        }
    })
})

router.delete('/events/deleteAll', (req, res) => {
    Event.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json('All events have been deleted.');
        }
    })
})

/**
 * When we make a request to this route, the token
 * is first verified, and only then the code in this
 * particular api gets executed. So if the user tries
 * to send an invalid token, the code isn't run, and
 * the user is met with a 401 status.
 */
router.get('/special', verifyToken, (req, res) => {
    SpecialEvent.find({}, [], { sort: { date: -1 } }, (err, specialEvents) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(specialEvents);
        }
    })
})

router.post('/special/createSpecialEvent', (req, res) => {
    const specialEvent = new SpecialEvent({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date
    })
    specialEvent.save((err, specialEvent) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(specialEvent);
        }
    })
})

module.exports = router;