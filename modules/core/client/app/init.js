'use strict';
angular.module(ApplicationConfiguration.applicationModuleName,ApplicationConfiguration.applicationDependencies);

//then init the app

angular.element(document).ready(function () {

    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});