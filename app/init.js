var config;
global.app = require('../app');
if (process.env.NODE_ENV !== undefined) {
    config = require('./config/' + process.env.NODE_ENV + '.json');
    global.app.summon.register('Configs', config);
}

global.app.setup();
