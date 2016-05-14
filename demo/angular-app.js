/**
 * Testing APP
 */
angular
    /**
     * App module
     */
    .module(
        'HttpLoaderTest',
        ['angular.http-loader']
    )

    /**
     * AppController
    */
    .controller(
        'AppController',
        ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
            $scope.requests = [];

            /**
             * Ajax action
             */
            $scope.ajaxTest = function() {
                $scope.requests = [];
                $scope.requests.push('Request: test1');

                $http({
                    method: 'GET',
                    url: 'https://httpbin.org/get',
                    loader: 'test1'
                })
                .then(function(response) {
                    $scope.requests.push('Response: test1, Status: '+ response.status +' '+ response.statusText);
                }, function(response) {
                    $scope.requests.push('Response: test1, Status: '+ response.status +' '+ response.statusText);
                });

                $timeout(function() {
                    $scope.requests.push('Request: test2');

                    $http({
                        method: 'POST',
                        url: 'https://httpbin.org/get',
                        loader: 'test2'
                    })
                    .then(function(response) {
                        $scope.requests.push('Response: test2, Status: '+ response.status +' '+ response.statusText);
                    },function(response) {
                        $scope.requests.push('Response: test2, Status: '+ response.status +' '+ response.statusText);
                    });
                }, 100);
            }
        }]
    )

    /**
     * Convert object toArray
     */
    .filter(
        'toArray', function() {
        return function(input) {
            if (!input) return;

            if (input instanceof Array)
                return input;

            return angular.map(input, function(val) {
                return val;
            });
        };
    });
