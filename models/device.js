var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema(
    {
        uuid:{
            type:String,
            required:true
        },
        userID:{
            type:String,
            required:true 
        }
    }
)

var Device = module.exports = mongoose.model('Device', deviceSchema)

Device.getDevices = function(callback, limit){
    Device.find(callback).limit(limit);
}


