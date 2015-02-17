(function() {
  'use strict';

  angular.module('jcIscroll', [])

    .factory('jcIscroll', function() {
      return {
        // each instance is a key-value pair, eg. 'myInstanceId': iScrollInstance
        instances: {}
      };
    })

    .directive('jcIscrollClick', ['$parse', 'jcIscroll', function($parse, jcIscroll) {
      return function (scope, element, attrs) {
        var fn = $parse(attrs.jcIscrollClick);

        if (!angular.isDefined(attrs.jcIscrollInstanceId)) {
          throw new Error('No instance of iScroll specified. Please add the id of the relevant iScroll instance in a jc-iscroll-instance-id attribute');
        }

        element.on('click', function(event) {
          event.preventDefault();

          if (jcIscroll.instances[attrs.jcIscrollInstanceId].moved) {
            return;
          }

          scope.$apply(function() {
            fn(scope, { $event: event });
          });
        });
      };
    }]);
})();
