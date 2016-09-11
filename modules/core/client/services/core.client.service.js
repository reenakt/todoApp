'use strict';

angular
    .module('ToDoApp')
    .factory('TaskService' , function($http){

        var  _getTasks = function (){


            var promise = $http.get('/api/task');

            return promise;
        }

       var _createTask = function(todo){
           var promise = $http.post('/api/task',todo)
           return promise;
       }

        var _getTask = function (id) {

            return $http.get('/api/task/' + id);
        }

        var _updateTask = function (id,todo) {
            var promise = $http.put('/api/task/' +id ,todo)
            return promise;

        }

        var _deleteTask = function (id) {
            var promise = $http.delete('/api/task/' +id)
            return promise;

        }




       return {
           getTasks : _getTasks,
           getTask :  _getTask,
           createTask: _createTask,
           updateTask: _updateTask,
           deleteTask: _deleteTask
       }

    })
