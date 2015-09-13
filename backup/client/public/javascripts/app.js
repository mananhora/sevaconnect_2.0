$(document).ready(function(){

    $("#Causes").on('click', function(event){
        event.preventDefault();
        $('.causes').slideToggle();
    });


    $("#Locations").on('click', function(event){
        event.preventDefault();
        $('.locations').slideToggle();
    });


    $('h3').on('mouseenter', showCauses);

    $('.causes > li').on('click', function(event){
        event.preventDefault();

        $('.causes >li').css({'color':'black'});
        $(this).css({'color':'red'});


        $(this).addClass('highlighted');
    });

    $('.locations > li').on('click', function(event){
        event.preventDefault();
        // location = $(this).val();
        // console.log("location val   "+location);

        $('.locations >li').css({'color':'black'});
        $(this).css({'color':'red'});


        $(this).addClass('highlighted');
    });


function showCauses(){
            $('body').find('.causes').slideToggle();

}

});


    function run() {
        console.log("JAVASCRIPT");
            console.log(location+"   text");
            console.log("function run  "+location);
           

            $.ajax({
                url: '/nonprofitsbylocation',
                method: 'POST',
                data: {
                  "location" :location
                },
                dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    var result = (JSON.parse(data));
                    console.log(result[0].ngoname);
                    
                    for(var i = 0; i<result.length; i++){
                    $("#nonprofits").append('<li>'+result[i].ngoname+'</li>');
                }

                }
            });    
        }


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
