(function() {
  'use strict';

  angular.module('jcIScroll', [])

    .factory('jcIScroll', function() {
      return {
        instance: null
      };
    })

    .directive('jcIScrollClick', ['$parse', 'jcIScroll', function($parse, jcIScroll) {
      return function (scope, element, attrs) {
        var fn = $parse(attrs.jcIScrollClick);

        element.on('click', function(event) {
          event.preventDefault();

          if (jcIScroll.instance.moved) {
            return;
          }

          scope.$apply(function() {
            fn(scope, { $event: event });
          });
        });
      };
    }]);
})();
