var express = require('express');
var router = express.Router();
require('../models/connection');

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');


const OWM_API_KEY = process.env.OWM_API_KEY;


router.post(`/signup`, (req, res) => {
    if (!checkBody(req.body, ['name', 'email', 'password'])) {
        res.json({ result: false, error: 'Missing or empty field' })
        return
    }

    User.findOne({ email: req.body.email }).then(data => {
        if (data === null) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            newUser.save().then(() => {
                res.json({ result: true, newUser: data })
            })
        } else {
            res.json({ result: false, error: 'User already exists' })
        }
    })
})

router.post(`/signin`, (req, res) => {

    if (!checkBody(req.body, ['email', 'password'])) {
        res.json({ result: false, error: 'Missing or empty field' })
        return
    }

    User.findOne({ email: req.body.email, password: req.body.password }).then(data => {
        if (data) {
            res.json({ result: true })

        } else {
            res.json({ result: false, error: 'User not found' })
        }
    })
})




module.exports = router;