module.exports = function(app, FormController) {
    app.route('/form/:name?')
    	.post(FormController.create)
        .get(FormController.get);
};
