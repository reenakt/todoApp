'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    credoTask = mongoose.model('credoTask');

var todo;

describe('Todo model unit tests:',function () {

    before(function(done){
        todo = new credoTask({
            name: 'Task Name',
            note: 'Task Description',
            completed:'true or false'
        });

        done();
    })
});

describe('Testing the save method',function () {

    it('Should be able to save without problems',function () {

       todo.save(function(err){
           should.not.exist(err);
       })

    });

    it('Should not be able to save todo without name', function () {

        todo.name = '';

        todo.save(function (err) {
            should.exist(err);
        })
    });

    it('should be able to update an existing task', function (done) {

        todo.save(function (err) {

            should.not.exist(err);

            todo.remove(function(err){
                should.not.exist(err);
                done();
            })
        })
    })
})



after(function(done){
    Todo.remove().exec(done);
})