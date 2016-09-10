'use strict';

module.exports = function(app){
    var controller = require('../controllers/core.server.controller'),
        mainController=require('../controllers/main.server.controller');



// view task and create new task

    app
        .route('/')
        .get(mainController.index);

    app

        .route('/api/task')
        .get(controller.getTasks)
        .post(controller.createTask)

    app
        .route('/api/task/:todoId')
        .put(controller.updateTodo)
        .delete(controller.deleteTodo)
        .get(controller.getTodoById)


    app.param('todoId',controller.validateTodoIdAndForward);



}