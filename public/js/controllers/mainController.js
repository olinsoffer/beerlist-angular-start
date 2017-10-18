app.controller('mainCtrl', function ($scope, beerFact) {
    // $scope.beers = [];
    $scope.addBeer = function () {
        let obj = {
            abv: $scope.abv,
            image_url: $scope.image,
            name: $scope.name,
            style: $scope.style
        };
        beerFact.addBeer(obj)
        .then(function(beer){
            $scope.beers.push(beer);
        })
        .catch(function (error) {
            console.log(error);
        });
        // console.log($scope.beers)
    };
    $scope.removeBeer = function (index) {
        // console.log(index);
        let beerId = this.beer._id;
        beerFact.removeBeer(beerId)
        .then(function(beer) {
            $scope.beers.splice(index, 1);
            // console.log('hello');
        })
        .catch(function (error) {
            console.log(index);
            console.log(error);
        });
    };
    beerFact.getBeers()
        .then(function (beers) {
            $scope.beers = beers;
            console.log(beers)
        })
        .catch(function (error) {
            console.log(error);
        });
});