module.exports = function(mongoose, Configs) {
    mongoose.connect(Configs.dbHost, function(err) {
        if(err) {
            console.error(err, 'Make sure you have set the correct database connection string for dbHost in the config file.');
        }
    });
    return mongoose;
};
