
'use strict';

var express = require('./express'),
    config = require('../config'),
    path =require('path'),

    mongoose =require('./mongoose');




module.exports.loadRoutes = function(app){
    var coreRoute = require(path.join(process.cwd(),'modules/core/server/routes/core.server.routes'));
    coreRoute(app);
};


module.exports.start = function () {
    var self = this;
//initialize the express if mongodb is available
    mongoose.connect(function(db) {

        var app = express.init();

        //routes registration
        self.loadRoutes(app);


        app.listen(config.app.port, function () {
            console.log("Application is running on " + config.app.port + '. . .');
        });
    })
}
