
(function () {
    'use strict';

    var app = angular.module('app', []);
    app.controller('tripController', ['$scope', '$http', tripController]);
    var apiRoot = '/api/Trip/';
    function tripController($scope, $http) {

        $scope.loading = true;
        $scope.addMode = false;

        $http.get(apiRoot).success(function (data) {
            $scope.trips = data;
            $scope.loading = false;
        })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";
            $scope.loading = false;
        });

        $scope.toggleEdit = function () {
            this.trip.editMode = !this.trip.editMode;
        };

        $scope.toggleAdd = function () {
            $scope.addMode = !$scope.addMode;
        };

        $scope.add = function () {
            $scope.loading = true;
            $http.post(apiRoot, this.newtrip).success(function (data) {
                alert("Added Successfully!!");
                $scope.addMode = false;
                $scope.trips.push(data);
                $scope.loading = false;
            }).error(function (data) {
                $scope.error = "An Error has occured while Adding trip! " + data;
                $scope.loading = false;
            });
        };

        $scope.save = function () {
            alert("Edit");
            $scope.loading = true;
            var frien = this.trip;
            alert(frien);
            $http.put(apiRoot + frien.Id, frien).success(function (data) {
                alert("Saved Successfully!!");
                frien.editMode = false;
                $scope.loading = false;
            }).error(function (data) {
                $scope.error = "An Error has occured while Saving trip! " + data;
                $scope.loading = false;
            });
        };

        $scope.deletetrip = function () {
            $scope.loading = true;
            var Id = this.trip.Id;
            $http.delete(apiRoot + Id).success(function (data) {
                alert("Deleted Successfully!!");
                $.each($scope.trips, function (i) {
                    if ($scope.trips[i].Id === Id) {
                        $scope.trips.splice(i, 1);
                        return false;
                    }
                });
                $scope.loading = false;
            }).error(function (data) {
                $scope.error = "An Error has occured while Saving trip! " + data;
                $scope.loading = false;
            });
        };
    }
})();