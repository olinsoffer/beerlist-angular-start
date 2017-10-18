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
        };

    return {
        getBeers: getBeers,
        removeBeer: removeBeer,
        addBeer: addBeer
    };
});
