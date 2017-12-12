var express = require('express')
var passport = require('passport');
const url = require('url');

var router = express.Router()

Device = require('./../models/device')


router.get("/", passport.authenticate('jwt', { session: false }), function (req, res) {
    Device.find({ userID: req.query.userID }, function (err, devices) {
        
        res.json(devices);
    })
});

module.exports = router;

