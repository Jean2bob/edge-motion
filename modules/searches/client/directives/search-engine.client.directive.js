'use strict';

angular.module('searches').directive('searchEngine', ['$window','$state',
	function($window, $state) {
		return {
			templateUrl: 'modules/searches/views/search-engine.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

                scope.search = function(filter){
                    $state.go('search.result', {search : filter}, {reload : true});
                };
                /*global TweenMax*/
                /*
                angular.element(element[0].children[0]).on('focus', function(){
                    angular.element(element[0]).addClass('focused');
                    setTimeout(function(){
                        scope.showCategory();
                    }, 150);

                });


                //check if click is inside the box (look only for y position because element.[0].width === 100%
                angular.element($window).on('click', function(event){
                    var box = element[0].getBoundingClientRect();
                    box.y2 = box.y+box.height;
                    if((box.y>event.clientY || box.y2<event.clientY) && angular.element(element[0]).hasClass('focused')) {
                        scope.hideCategory(function(){
                            angular.element(element[0]).removeClass('focused');
                        });
                    }
                });
                */

			}
		};
	}
]);
