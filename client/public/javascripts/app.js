angular.module('nodeTodo', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};

    // Get all todos
    $http.get('/nonprofits')
        .success(function(data) {
            for (var i = 0; i < data.length; i = i + 1) {
                console.log(data[i].ngoname);
                $scope.todoData = data;
            }
            console.log("GET NONPROFITS");
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });


    $scope.search = function(cause) {
        console.log("searching for "+$scope.formData.text);
        $http.post('/nonprofitsbycause',$scope.formData)
            .success(function(data) {
                console.log("HELLLLO");
                for (var i = 0; i < data.length; i = i + 1) {
                    console.log(data[i].ngoname);
                    $scope.todoData = data;
                }
                console.log("GET NONPROFITS");
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });

    };

    // Create a new todo
    $scope.createTodo = function(todoID) {
        $http.post('/nonprofits', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

    // Delete a todo
    $scope.deleteTodo = function(todoID) {
        $http.delete('/nonprofits/' + todoID)
            .success(function(data) {
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});
