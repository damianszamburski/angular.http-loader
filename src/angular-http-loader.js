/**
 * http-loader v1.0
 * (c) 2016 Damian Szamburski, @:damian.szamburski@gmail.com, fb:/szamburski.damian
 * License: MIT
 */
 'use strict';

 angular.module('angular.http-loader', [])
     /**
      * Factory
      */
    .factory(
        'httpInterceptor', ['$q', '$rootScope', '$log', '$injector', function($q, $rootScope, $log, $injector) {
        /**
         * Model create.
         */
        $rootScope.httpLoader = {};

        /**
         * Define factory functions.
         */
        return {
            request: request,
            response: response,
            responseError: responseError
        }

        /**
         * Implements request().
         */
        function request(config) {
            _add(config);
            return config || $q.when(config);
        }

        /**
         * Implements response().
         * success
         */
        function response(response) {
            _delete(response.config);
            return response || $q.when(response);
        }

        /**
         * Implements responseError().
         * error
         */
        function responseError(response) {
            _delete(response.config);
            return $q.reject(response);
        }

        /**
         * Add new element to loader scope.
         *
         * @param (object) config - Http config
         */
        function _add(config) {
            if (typeof config.loader != 'undefined') {
                $rootScope.httpLoader[config.loader] = (typeof $rootScope.httpLoader[config.loader] != 'undefined' && $rootScope.httpLoader[config.loader] > 0)
                    ? ++$rootScope.httpLoader[config.loader]
                    : 1;
            }
        }

        /**
         * Remove loader element from scope.
         *
         * @param (object) config - Http config
         */
        function _delete(config) {
            if (typeof config.loader != 'undefined') {
                --$rootScope.httpLoader[config.loader];
            }
        }
    }])

    /**
     * Config
     */
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }])

    /**
     * Directive
     */
    .directive(
        'ngLoader', ['$timeout', '$rootScope', function($timeout, $rootScope) {
        return {
            restrict:'A',
            link: function($scope, elem, attrs) {
                var types = attrs.ngLoader.split(' '),
                    models = [],
                    request = [],
                    css_class = 'ajax-loading',
                    init = (typeof attrs.ngLoaderInit != 'undefined')
                        ? attrs.ngLoaderInit
                        : false;

                /**
                 * Fill models.
                 */
                for (var type in types) {
                    models.push('httpLoader.'+ types[type]);
                }

                /**
                 * Set init value if exist.
                 */
                if (init) {
                    elem.addClass(css_class);
                }

                /**
                 * Observe ajax progress.
                 */
                $rootScope.$watchGroup(models, function(newValues, oldValues) {
                    for (var newValue in newValues) {
                        if (typeof newValues[newValue] == 'undefined')
                            continue;

                        if (newValues[newValue] > 0)
                            request[newValue] = newValues[newValue];
                        else
                            request.splice(newValue);
                    }

                    if (request.length > 0)
                        elem.addClass(css_class);
                    else
                        elem.removeClass(css_class);
                }, true);
            }
        }
    }]);
