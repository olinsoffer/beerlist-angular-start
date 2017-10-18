app.factory('beerFact', function ($http) {
    let
        getBeers = function () {
            return $http.get('/beers')
                .then(function (response) {
                    return angular.copy(response.data);
                });
        },
        removeBeer = function (id) {
            return $http.delete('/beers/' + id)
            .then(function(response) {
                return angular.copy(response.data);
            });
        },
        addBeer = function (beerObj) {
            return $http.post('/beers', beerObj)
                .then(function (response) {
                    return angular.copy(response.data);
                });
        },
        getBeer = function(id) {
            return $http.get('/onebeer/'+id)
            .then(function(response) {
                return angular.copy(response.data);
            });
        },
        addReview = function(id , review) {
            return $http.post('/beers/'+id+'/reviews', review)
            .then(function(response) {
                return angular.copy(response.data);
            });
        };

    return {
        getBeers: getBeers,
        removeBeer: removeBeer,
        addBeer: addBeer,
        getBeer: getBeer,
        addReview: addReview
    };
});
