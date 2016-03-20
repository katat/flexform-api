global.app = require('../app');
var configs = require('../app/config/test.json');
global.app.summon.register('Configs', configs);

var mockgoose = require('mockgoose');
mockgoose(app.summon.get('mongoose'));
app.summon.register('mockgoose', function(){
    return mockgoose;
});
app.setup();
