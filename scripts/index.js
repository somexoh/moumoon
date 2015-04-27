var app = angular.module("LocFront", []);

app.controller('Mapper', ["$scope", "acquireList", function ($scope, acquireList) {
    $scope.name = "mapper";
    $scope.test = [];
    $scope.clickFunc = function () {
        acquireList.getTestList(function(data){
            $scope.test = data;
            $scope.test.pop();
        });
    };
}])

.factory("acquireList", ["$http", function ($http) {
    var time = "time";
    var getTestList = function ( sFunc ) {
        $http
            .get("/backend.php")
            .success(function (data) {
                console.log(data);
                sFunc(data);
            })
            .error()
    };
    return {
        "test": time,
        "getTestList": getTestList
    };
}])

.filter( 'trustAsResourceUrl', ['$sce', function($sce){
    return function(val){
        return $sce.trustAsResourceUrl(val);
    }
}] )
