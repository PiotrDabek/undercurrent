var express = require('express')
var router = express.Router();
var bCrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;


var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

User = require('./../models/user')

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = '20__uNdErCuRrEnT__17';

var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

router.post("/login", function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (!user) {
            res.status(401).json({ message: "no such user found" });
        }
        if (user.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            var payload = { id: user._id };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({
                message: "login successful",
                userID: user._id,
                token: token
            });
        } else {
            res.status(401).json({ message: "passwords did not match" });
        }
    })
});

router.post("/signup", function (req, res) {
    User.findOne({ username: req.body.username }, function (err, username) {
        if (!username) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    var newUser = req.body;
                    console.log(newUser)
                    newUser.registrationTime = new Date();
                    User.create(newUser, function (err, newUser) {
                        if (err) {
                            throw err;
                        }
                        res.json(newUser)
                    });
                }
                else {
                    res.status(401).json({ message: "email already in use" });
                }
            })
        } else {
            res.status(401).json({ message: "username already taken" });
        }

    })
});



module.exports = router;