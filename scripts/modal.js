app.directive('modal', function($timeout, $interval) {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: { show: "=" },
        templateUrl: 'partials/modal.html',
        link: function ($scope, element) {

            $scope.$watch('show', function (newValue, oldValue) {
                if ($scope.show) {
                    angular.element(element).modal('show');
                } else {
                    angular.element(element).modal('hide');
                }
            });
        }
    };
});
