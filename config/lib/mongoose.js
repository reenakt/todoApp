'use strict';
var config = require('../config'),
    path= require('path'),
    mongoose =require('mongoose'),

    task = require(path.join(process.cwd(), 'modules/core/server/models/core.server.model'));


module.exports.connect = function(callback){

    var db=  mongoose.connect(config.db.uri,config.db.options,function(err){
        if(err){
            console.log("Error: couldnt connect mongodb");
            console.log(err);
        }else{
            if(callback) callback(db);
        }
    })

}