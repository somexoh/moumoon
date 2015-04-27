var app = angular.module("LocFront", []);

app.controller('Mapper', ["$scope", "acquireList", function ($scope, acquireList) {
    $scope.name = "mapper";
    $scope.test = acquireList.test;
    $scope.clickFunc = function () {
        $scope.test = acquireList.getTestList();
    };
}])

.factory("acquireList", ["$http", function ($http) {
    var time = "time";
    var getTestList = function () {
        $http
            .get("http://121.41.47.132/backend.php")
            .success(function (data) {
                console.log(data);
            })
            .error()
    };
    return {
        "test": time,
        "getTestList": getTestList
    };
}]);
