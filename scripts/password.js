app.directive('password', function($timeout, $interval) {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: { newPassword: "=" },
        template: '<textarea class="password" row="1" readonly ng-click="pasteInClipboard($event)" data-content="copied to clipboard" data-position="top center" data-variation="inverted">{{password}}</textarea>',
        link: function ($scope, element) {

            $scope.password = '';
            $scope.pitch = 50;
            $scope.interval = null;
            $scope.index = 0;

            angular.element(element).popup({
                on: 'manual',
                position: 'right center'
            });

            $scope.insertCharacterPassword = function (character, timeout) {
                $timeout(function () {
                    $scope.password += character;
                }, timeout);
            };

            $scope.$watch('newPassword', function (newValue, oldValue) {
                if (newValue) {
                    $scope.index = 0;
                    $scope.password = '';
                    if ($scope.interval) {
                        $interval.cancel($scope.interval);
                    }
                    $scope.interval = $interval(function () {
                        $scope.password += $scope.newPassword[$scope.index];
                        $scope.index++;
                        if ($scope.index == $scope.newPassword.length) {
                            $interval.cancel($scope.interval);
                        }
                    }, 70);
                    // for (var i = 0 ; i < newValue.length ; i++) {
                    //     $scope.insertCharacterPassword(newValue[i], i*70);
                    // }
                }
            });

            $scope.displayPopup = function () {
                // console.log('toggle');
                // console.log($(element)[0]);
                angular.element(element).popup('toggle');
                angular.element(element).addClass('password-active');
                angular.element(element).select();

                $timeout(function () {
                    angular.element(element).popup('toggle');
                    angular.element(element).removeClass('password-active');
                }, 2000);
            };

            $scope.pasteInClipboard = function ($event) {
                try {
                    if(!document.execCommand('copy')) {
                        throw "Not supported";
                    }
                } catch(ex) {
                    //alert('This is not supported in current browser');
                }
            };

            angular.element(document).on('copy', function(ev) {
                if(window.clipboardData) {
                    window.clipboardData.setData('Text', $scope.newPassword);
                    $scope.displayPopup();
                } else if(ev.originalEvent.clipboardData) {
                    ev.originalEvent.clipboardData.setData('text/plain', $scope.newPassword);
                    $scope.displayPopup();
                } else {
                    //alert('Clipboard Data are not supported in this browser. Sorry.');
                }
                ev.preventDefault();
            });

        }
    };
});
