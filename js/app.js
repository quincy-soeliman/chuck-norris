angular
  .module('chuckApp', [])
  .factory('chuckFactory', ['$http', function($http){
    var urlBase = 'http://api.icndb.com/jokes';

    var chuckFactory = {};

    chuckFactory.getRandomJoke = function(firstName, lastName) {
      return $http.jsonp(urlBase + '/random?callback=JSON_CALLBACK&firstName=' + firstName + '&lastName=' + lastName);
    };

    return chuckFactory;
  }])
  .controller('chuckController', ['$scope', 'chuckFactory', function($scope, chuckFactory) {
    $scope.person = {};
    $scope.joke = '';

    $scope.getRandomJoke = function(firstName, lastName) {
      chuckFactory.getRandomJoke(firstName, lastName).then(function(response) {
        var joke = response.data.value.joke;
        $scope.joke = joke.replace(/&quot;/ig, '"');
      });
    };
  }]);
