'use strict';

var mongoose = require('mongoose'),

    Todo = mongoose.model('credoTask');

module.exports.saveTask = function(savableTask,callback){

    var todo = new Todo(savableTask);

    todo.save(function(err){
        if(err){
            callback(err);
        }
        callback(null,todo);
    })
}

module.exports.getTasks = function(callback){

    Todo.find({},{__v:0}, function(err,todo){
        if(err) throw err;

        callback(null,todo);
    })

    // get only completed tasks

    Todo.find({completed:true},callback);


}

//get contact by id

module.exports.getTaskById = function(id,todo,callback){


    Todo.findOne({'_id':id},function (err,todo) {
        if(err)
            callback(err);
        else
            callback(null,task);
    })
}



//find contact by id

module.exports.findTaskById = function (id,callback) {

    Todo.findOne({'_id':id}, function(err, todo){

        if(err) throw err;

        callback(todo);
    });

}
module.exports.updateTodo = function(id,updatedTask,callback){

    Todo.findByIdAndUpdate(id,updatedTask,function(err,todo){
        if(err) {
            callback (err);
        }
        callback(null,todo);
    });

}

module.exports.deleteTodo = function(id,callback) {
    Todo.findByIdAndRemove(id, function (err) {
        if (err) {
            callback(err);
        }else
            Todo.find({}, {__v:0}, function(err, todo){
                if(err) callback(err);
                else callback(null, todo);

            })



    });

}