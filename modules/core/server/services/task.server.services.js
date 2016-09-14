'use strict';

var mongoose = require('mongoose'),

    Todo = mongoose.model('credoTask');

module.exports.saveTask = function(savableTask,callback){

    var todo = new Todo(savableTask);

    todo.save(function(err){
        if(err)
            callback(err);
        else
            callback(null,todo);


    })
}

module.exports.getTasks = function(callback){

    Todo.find({},{__v:0}, function(err,todo){

        if(err)
            callback(err);

        else
            callback(null,todo);


    })



}

//get task by id

module.exports.getTaskById = function(id,todo,callback){


    Todo.findOne({'_id':id},function (err,todo) {
        if(err)
            callback(err);
        else
            callback(null,todo);
    })
}

module.exports.findTaskById = function (id,callback) {

    Todo.findOne({'_id':id}, function(err, todo){

        if(err) {
            callback(err)
        }else {

            callback(null,todo);
        }

        return todo;
    });

}

module.exports.updateTodo = function(id,updatedTask,callback){

    var checkTodo = new Todo(updatedTask);

    Todo.update({_id: id},updatedTask,null,function (err,todo) {

        if(err){

            callback(err);
        }else{
            callback(null,updatedTask);
        }

    })


}


module.exports.deleteTodo = function(id,callback) {

    Todo.remove({_id:id}, function (err) {

        if (err) {
            callback(err);
        }else{

            callback(null);
        }


    });

}