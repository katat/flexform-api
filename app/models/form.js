module.exports = function(mongoose, FormDB) {
    var schema = {
        name: String,
        fields: mongoose.Schema.Types.Mixed
    };
    var FormModel = FormDB.model('FormModel', schema);
    return FormModel;
};
