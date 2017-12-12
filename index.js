var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var path = require('path')

var jwt = require('jsonwebtoken');

var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var devices = require('./routes/devices')
var measurements = require('./routes/measurements')
var users = require('./routes/users')


var app = express();
app.set('port', (process.env.PORT || 3002))

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Passport init
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = '20__uNdErCuRrEnT__17';

passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = User.findOne({ "_id": jwt_payload.id })
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
}));

app.use(passport.initialize());



//Routes
app.use('/devices', devices);
app.use('/measurements', measurements);
app.use('/users', users);
app.use(express.static(path.resolve(__dirname, 'client', 'build')))

mongoose.connect('mongodb://localhost/undercurrent');
var db = mongoose.connection;

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build'));
});

app.listen(app.get('port'), function () {
    console.log('Server started on port: ' + app.get('port'))
});