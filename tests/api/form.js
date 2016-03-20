var request = require('supertest');
var assert = require('assert');
var async = require('async');
describe('API tests', function() {
    var Mongoose = require('mongoose').Mongoose;
    var mongoose = new Mongoose();
    var mockgoose = require('mockgoose');
    beforeEach(function (done) {
        mockgoose(mongoose);
        mongoose.connect(app.summon.get('configs').dbHost));
        app.summon.register('mongoose', mongoose);
        mockgoose.reset();
    });

    it('should create new form type', function (done) {
        var formDefine = {
            name: 'newForm',
            fields: [
                {name: 'First Name', type: 'text'},
                {name: 'Last Name', type: 'text'},
                {name: 'Email', type: 'email'},
                {name: 'Introduction', tyep: 'textarea'}
            ]
        };
        request(app)
            .post('/form')
            .send(formDefine)
            .end(function(err, res) {
                assert.ifError(err);
                var created = res.body;
                assert(created.id);
                assert.deepEqual(formDefine.fields, created.fields);
                done();
            });
    });
});
