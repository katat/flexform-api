'use strict';

var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());

//init summonjs
var depConfigs = require('./depend.json');
var summon = require('summonjs')({
    configs: depConfigs
});
app.summon = summon;
app.setup = function(callback) {
    var targets = Object.keys(depConfigs.dependency).map(function(name){
        if(name.toLowerCase().indexOf('route') !== -1) {
            return name;
        }
    }).filter(function(name){
        return name? true: false;
    });
    summon.invoke({
        override: {app: function(){return app;}},
        targets: targets
    });
    var server = app.listen(app.summon.get('Configs').apiPort || 5000, function() {
        var port = server.address().port;
        callback && callback();
        console.log('Server up and listening at %s', port);
    });
};

module.exports = app;
