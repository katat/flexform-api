require('../setup');
['/api'].forEach(function(dir) {
	require('require-all')(__dirname + dir);
});
