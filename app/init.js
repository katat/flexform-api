var configFile = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV + '.json' : 'dev.json';
var config = require('./config/' + configFile);

global.app = require('../app');
global.app.summon.register('Configs', config);
global.app.setup();
