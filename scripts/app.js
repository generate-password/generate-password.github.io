var app = angular.module("generatePassword", ['ngCookies']);
app.controller("IndexCtrl", function($scope, $timeout, $cookies, generatePassword) {

    $scope.newPassword = undefined;
    $scope.settingsActive = false;
    $scope.showConvince = false;

    $scope.length = 16;
    $scope.pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/.?,;:!*$=+}])@_-[({\'"#~&<>';
    $scope.similarCharacters = 'iIL1o0O';
    $scope.excludeSimilars = true;

    $scope.save = false;
    $scope.startRefreshing = false;

    var cookies = $cookies.getAll();
    //console.log(cookies);

    if (cookies.length) {
        $scope.length = parseInt(cookies.length);
    }

    if (cookies.pool) {
        $scope.pool = cookies.pool;
    }

    if (cookies['similar-characters']) {
        $scope.similarCharacters = cookies['similar-characters'];
    }

    if (cookies['exclude-similars']) {
        $scope.excludeSimilars = (cookies['exclude-similars'] == "true");
    }

    if (cookies.save) {
        $scope.save = (cookies.save == "true");
    }

    $scope.refresh = function (callback) {
        if ($scope.startRefreshing) {
            $scope.refreshing = true;
            $timeout(function () {
                $scope.refreshing = false;
            }, 1000);
        }
        $scope.newPassword = generatePassword({
            length: $scope.length,
            pool: $scope.pool,
            exclude_similars: $scope.excludeSimilars,
            to_exclude: $scope.similarCharacters
        });

        callback && callback();
    };

    $scope.refresh(function () {
        $scope.startRefreshing = true;

        $scope.$watch('length', function () {
            if ($scope.save) {
                $cookies.put('length', $scope.length);
            }
            $scope.refresh();
        });

        $scope.$watch('pool', function () {
            if ($scope.save) {
                $cookies.put('pool', $scope.pool);
            }
            $scope.refresh();
        });

        $scope.$watch('similarCharacters', function () {
            if ($scope.save) {
                $cookies.put('similar-characters', $scope.similarCharacters);
            }
            $scope.refresh();
        });

        $scope.$watch('excludeSimilars', function () {
            if ($scope.save) {
                $cookies.put('exclude-similars', $scope.excludeSimilars);
                var cookies = $cookies.getAll();
                //console.log(cookies);
            }
            $scope.refresh();
        });

        $scope.$watch('save', function () {
            if ($scope.save) {
                $cookies.put('length', $scope.length);
                $cookies.put('pool', $scope.pool);
                $cookies.put('similar-characters', $scope.similarCharacters);
                $cookies.put('exclude-similars', $scope.excludeSimilars);
                $cookies.put('save', $scope.save);

                var cookies = $cookies.getAll();
                //console.log(cookies);
            } else {
                $cookies.remove('length');
                $cookies.remove('pool');
                $cookies.remove('similar-characters');
                $cookies.remove('exclude-similars');
                $cookies.remove('save');
            }
        });
    });

    $scope.toggleSettings = function ($event) {
        console.log('toggle');
        $scope.settingsActive = !$scope.settingsActive;
        $event.preventDefault();
        $event.stopPropagation();
    };

    $scope.hideSettings = function ($event) {
        console.log('hide');
        $scope.settingsActive = false;
        $event.preventDefault();
        $event.stopPropagation();
    };

    $scope.convince = function () {
        $scope.showConvince = true;
    };



});
