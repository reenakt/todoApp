'use strict';

angular

    .module('ToDoApp')
    .config(function($stateProvider) {

        $stateProvider


            .state('display' ,{

                url:'/display',
                templateUrl:'modules/core/client/views/display.client.tpl.html'


            })



            .state('create', {
                url: '/create',
                templateUrl: 'modules/core/client/views/create.client.tpl.html'

            })

            .state('edit',{
                url:'/edit/:todoId',
                templateUrl:'modules/core/client/views/edit.client.tpl.html',
                resolve: {
                    todoId: function ($stateParams) {
                        return $stateParams.todoId;
                    }
                },
                controller:'editCtrl'
            })




    });