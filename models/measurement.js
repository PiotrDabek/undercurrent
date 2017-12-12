var mongoose = require('mongoose');

var measurementSchema = mongoose.Schema(
    {
        value:{
            type:Number,
            required:true
        },
        deviceUUID:{
            type:String,
            requires:true
        },
        timestamp:{
            type:Date,
            required:true
        }
    }
)

var Measurement = module.exports = mongoose.model('Measurement', measurementSchema)


Measurement.getMeasurements = function(callback, limit){
    Measurement.find(callback).limit(limit);
}

Measurement.addMeasurement = function(measurement, callback){
    Measurement.create(measurement,callback);
}