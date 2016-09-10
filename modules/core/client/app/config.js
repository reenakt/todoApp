
'use strict';
var ApplicationConfiguration = (function () {


    var  _applicationModuleName='ToDoApp',

        _applicationDependencies = ['ui.router'];

    var _registerModule= function (moduleName,dependencies) {

        //create angular module

        angular.module(_applicationModuleName,dependencies || []);
        angular.module(_applicationModuleName).requires.push(moduleName);
    }
    return{
        applicationModuleName: _applicationModuleName,
        applicationDependencies: _applicationDependencies,
        registerModule:  _registerModule

    }

})();

