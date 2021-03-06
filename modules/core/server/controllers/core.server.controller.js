'use strict';

var taskService = require('../services/task.server.services');

module.exports.getTasks = function(req,res){

    taskService.getTasks(function(err,todos){

        if(err){

            res
                .status(400)
                .send({message: "could not get the task"});

        }else{
            res
                .status(200)
                 .json(todos);

        }
    });

}


module.exports.createTask = function(req,res){

    var todo = req.body;

    if(!todo){
        res.status(400);
        res.end("Error : couldn't save todo");
    }

    taskService.saveTask(todo, function(err,todo){
        if(err){

            res
                .status(400)
                .send({message:"Error : Internal error while saving data"});


        }else{
            res
                .status(200)
                .json(todo);
        }
    })
}
module.exports.validateTodoIdAndForward= function(req,res,next,id){
    var metadata = req.metadata= {};

    metadata.todoId = id;

    taskService.findTaskById(id,function (err,foundTask) {

        if(err){

            res.status(400)
                .send({message:"Error:: Unable to validate task"})

            return;

        }else if(foundTask) {

            metadata.model = foundTask;
             next();
        }
    });


}

module.exports.updateTodo = function(req,res) {
    var updatedTask = req.body,
        id = req.metadata.todoId;

    taskService.updateTodo(id,updatedTask,function (err,todo) {

        if (err) {
            res.status(400)
                .send({message: "unable to update task.please try again"})

        } else {
            res
                .status(200)
                .json(todo);
        }

    });
}

//to delete contact

module.exports.deleteTodo = function(req,res) {

    var id= req.metadata.todoId;

    taskService.deleteTodo(id,function(err) {


        if (err) {
            res.status(400)
                .send({message: "unable to delete task "})

        } else {
            res.status(200)
                .json("Success");
        }
    });
}
// get task by id

module.exports.getTodoById = function(req,res){

    var todo= req.body,
        id = req.metadata.todoId;

    taskService.getTaskById(id,todo,function(err,todo){

        if(err){
            res.status(400)
                .send({message:"unable to get task"})

        }else{
            res.status(200)
                .json(todo);
        }


    })


}