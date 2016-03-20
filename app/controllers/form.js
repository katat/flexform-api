module.exports = function(app, FormModel) {
    this.create = function(req, res) {
        var formDefine = req.body;
        FormModel.findOneAndUpdate(
            {name: formDefine.name},
            formDefine,
            {upsert: true},
            function(error, doc) {
                if (error) {
                    return res.status(500).send(error);
                }
                res.status(201).send(doc);
            });
    };

    this.get = function(req, res) {
        var name = req.params.name;
        FormModel.findOne({name: name}, function(error, doc) {
            if (error) {
                return res.status(500).send(error);
            }
            res.status(200).send(doc);
        });
    };

    return this;
};
