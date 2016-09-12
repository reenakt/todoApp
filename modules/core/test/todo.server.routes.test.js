'use strict';

var should = require('should'),

    request = require('supertest'),
    path = require('path'),

    mongoose = require('mongoose'),
     credoTask= mcongoose.model('credoTask'),

    express = require(path.resolve('./config/lib/express'));

var todo, _todo;

describe('Todo CRUD tests',function () {

    before(function (done) {

        //get application
        app = express.init(mongoose);
        done();
    });


// create new task

    _todo = {
        name: 'Task Name',
        note: 'Task Description',
        completed: 'true or false'
    };
    todo = new CredoTask(_todo);
    todo.save(function (err) {
        should.not.exist(err);
        done();
    });
});

it('should be able to get the list of todos', function (done) {


    request(app).get('/api/task/')

        .set('Accept' , 'application/json')
        .expect('Content_Type', /json/)
        .expect(200)
        .end(function (err,res) {

            res.body.should.be.an.Array.and.have.lengthOf(1);
            res.body[0].should.have.property('name', todo.name);
            res.body[0].should.have.property('note', todo.note);
            res.body[0].should.have.property('completed', todo.completed);

            done();
        })
})

it('should be able to get one task', function (done) {


    request(app).get('/api/task/' +todo.id)

        .set('Accept' , 'application/json')
        .expect('Content_Type', /json/)
        .expect(200)
        .end(function (err,res) {

            res.body.should.be.an.Object.and.have.property('name',todo.name);
            res.body.should.have.property('name', todo.name);
            res.body.should.have.property('note', todo.note);
            res.body.should.have.property('completed', todo.completed);
            done();
        })
})

afterEach(function(done){
    Todo.remove().exec(done);

})
