angular.module('lapsus', ['ngRoute', 'restangular']);

angular.module('lapsus').config(function ($routeProvider, $locationProvider) {
    //

    $routeProvider.when('/', {
        controller: 'IndexController',
        templateUrl: 'view/index.html'
    }).when('/login', {
        controller: 'LoginController',
        templateUrl: 'view/login.html'
    });

    $locationProvider.html5Mode(false);
    $routeProvider.otherwise('/');

});

angular.module('lapsus').controller('IndexController', function ($scope, $http) {

});

angular.module('lapsus').controller('LoginController', function ($scope, Restangular) {

    $scope.form = {};

    $scope.login = function() {
        Restangular.all('users').customPOST({
            username: $scope.form.username,
            password: $scope.form.password
        }, "login").then(function(me) {
            $scope.response = me;
            $scope.refresh();
        }, function errorCallback(err) {
            $scope.response = err;
        })
    };

    $scope.logout = function() {
        Restangular.all('users').customPOST({}, "logout");
    };

    $scope.refresh = function() {
        Restangular.all('items').getList().then(function (items) {
            $scope.items = items;
        }, function errorCallback(err) {
            $scope.items = err;
        });
        Restangular.all('users/me').customGET("").then(function (me) {
            $scope.me = me;
        }, function errorCallback(err) {
            $scope.me = err;
        });
    };

    $scope.refresh();
});
