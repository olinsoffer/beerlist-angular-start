var app = angular.module('beerList', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'mainCtrl',
            templateUrl: '/templates/home.html'
        })
        .state('beer', {
            url: '/beer/:beerId',
            templateUrl: '/templates/beer.html',
            controller: function ($scope, $stateParams, beerFact) {
                if ($stateParams.beerParam) {
                    $scope.beer = $stateParams.beerParam;
                    $scope.reviews = $scope.beer.reviews;
                } else {
                    beerFact.getBeer($stateParams.beerId)
                        .then(function (beerObj) {
                            console.log(beerObj)
                            $scope.beer = beerObj;
                            $scope.reviews = $scope.beer.reviews;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                $scope.addReview = function() {
                    let obj = {
                        user: $scope.user,
                        comment : $scope.comment
                    };
                    beerFact.addReview($stateParams.beerId, obj)
                    .then(function (review) {
                        $scope.reviews.push(review);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                };
            },
            params: {
                beerParam: null
            }
        });

    $urlRouterProvider.otherwise('/home');
}]);