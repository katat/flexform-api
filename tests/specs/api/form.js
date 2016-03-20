var request = require('supertest');
var assert = require('assert');
var async = require('async');
describe('API tests', function() {
    beforeEach(function () {
        app.summon.get('FormDB');
        app.summon.get('mockgoose').reset();
    });

    var formDefine = {
        name: 'newForm',
        fields: [
            {name: 'First Name', type: 'text'},
            {name: 'Last Name', type: 'text'},
            {name: 'Email', type: 'email'},
            {name: 'Introduction', type: 'textarea'}
        ]
    };
    it('should create new form type', function (done) {
        request(app)
            .post('/form')
            .send(formDefine)
            .expect(201)
            .end(function(err, res) {
                assert.ifError(err);
                var created = res.body;
                assert(created._id);
                assert.deepEqual(formDefine.fields, created.fields);
                done();
            });
    });
    it('should get a created form', function (done) {
        var FormModel = app.summon.get('FormModel');
        FormModel.create(formDefine, function(err, doc) {
            var formName = doc.name;
            request(app)
                .get('/form/' + formName)
                .expect(200)
                .end(function(err, res) {
                    assert.ifError(err);
                    assert.deepEqual(formDefine.fields, res.body.fields);
                    done();
                });
        });
    });
});
