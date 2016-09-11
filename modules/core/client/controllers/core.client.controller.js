'use strict';

angular
    .module('ToDoApp')
    .controller('displayCtrl', ['$scope','$state','TaskService',function($scope,$state,TaskService){


        var taskPromise = TaskService.getTasks();
        var successCallback = function (response) {

            $scope.todos = response;

        }

        var failureCallback = function (err) {
            console.log("Error while displaying tasks");
        }
        taskPromise

            .success(successCallback)
            .error(failureCallback);

        //update todo after clicking action

        $scope.update = function (todo) {

            $state.go('edit', {todoId: todo._id});
        }

        $scope.delete = function (id) {

            var deletePromise = TaskService.deleteTask(id);

            var successCallback = function (response) {
                $scope.message = response;

            };

            var failureCallback = function (err) {
                console.log("Error while delete tasks");
            };

            deletePromise

                .success(successCallback)
                .error(failureCallback);
        }


    }])

    .controller('saveCtrl',['$scope','TaskService',function($scope,TaskService){


        var todo = $scope.todo;

        $scope.saveTask=function(todo){

            var savePromise = TaskService.createTask(todo);

            var successCallback = function (response) {
                console.log("success");
            }

            var failureCallback = function (err) {
                console.log("Error while saving task");
            }

            savePromise

                .success(successCallback)
                .error(failureCallback);
        }
    }])

    .controller('editCtrl',['$scope','todoId','TaskService', function ($scope , todoId, TaskService) {

        TaskService

            .getTask(todoId)
            .success(function(todo){

                $scope.task=todo;

            }).error(function(err){
            console.log("Error::occured during get operation")
        })
    }])


    .controller('updateCtrl',['$scope','TaskService','$state',function ($scope,TaskService,$state) {


        $scope.update = function(todo) {
            var updatePromise = TaskService.updateTask(todo._id ,todo);
            var successCallback = function (response) {
                console.log("success");
                $state.go('display');
            };

            var failureCallback = function (err) {
                console.log("Error while update task");
                $state.go('edit');
            }

            updatePromise

                .success(successCallback)
                .error(failureCallback);

        }
    }])