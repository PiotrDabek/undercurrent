var express = require('express')
var router = express.Router()

Measurement = require('./../models/measurement')

router.get('/', function(req,res){
    Measurement.getMeasurements(function(err,devices){
        if(err){
            throw err;
        }
        res.json(devices)
    });
})

router.post('/', function(req,res){
    var measurement = req.body;
    console.log(measurement)
    measurement.timestamp = new Date();
    Measurement.addMeasurement(measurement,function(err,measurement){
        if(err){
            throw err;
        }
        res.json(measurement)
    });
})


module.exports = router;