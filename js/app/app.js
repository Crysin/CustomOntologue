var myApp = angular.module('ontologueApp', ['ui.bootstrap', 'ngRoute'])
	.config(function($routeProvider, $sceProvider) {
        $sceProvider.enabled(false);
		$routeProvider.when('/', {
			templateUrl: '/CustomOntologue/partials/_main.html',
			controller: AppCtrl
		})
		.when('/resource/:id', {
			templateUrl: '/CustomOntologue/partials/_main.html',
			controller: ResourceCtrl
		})
		.otherwise({
			redirectTo: '/'
		})
	});

var uiAutocomplete = function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, controller) {
            var getOptions = function() {
                return angular.extend({}, scope.$eval(attrs.uiAutocomplete));
            };
            var initAutocompleteWidget = function () {
                var opts = getOptions();
                element.autocomplete(opts);
                if (opts._renderItem) {
                    element.data("autocomplete")._renderItem = opts._renderItem;
                }
            };
            // Watch for changes to the directives options
            scope.$watch(getOptions, initAutocompleteWidget, true);
        }
    };
};

var ButtonsCtrl = function ($scope) {

    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };
};

myApp.directive('uiAutocomplete', [uiAutocomplete]);


var config = {};
config.baseDir = '/CustomOntologue';
config.partialsDir = config.baseDir + '/partials';

var mockDataStore = {};

mockDataStore.resources= [
	{
		id: 1,
        type: 'Animal',
		name: 'giraffe',
		uri: 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Giraffe_July_2008-1.jpg/640px-Giraffe_July_2008-1.jpg',
		fileName:'640px-Giraffe_July_2008-1.jpg',
		mediaType:'image',
		tags:['giraffe', 'animal', 'neck', 'lisbon', 'portugal', 'spots', 'zoologogy', 'image'],
		date: 'Fri Jul 18 2013 14:57:23 GMT-0400 (EDT)',
		uploadDate: 'Fri Jul 18 2013 17:23:31 GMT-0400 (EDT)',
		editDate: 'Mon Jul 22 2013 7:07:44 GMT-0400 (EDT)'

	},
	{
		id: 2,
        type: 'Space',
		name: 'black hole',
		uri: 'http://svs.gsfc.nasa.gov/vis/a010000/a010100/a010139/BlackHole1_HD_LARGE_QT_Video_1.mp4',
		fileName:'BlackHole1_HD_LARGE_QT_Video_1.mp4',
		mediaType:'video',
		tags:['space', 'science', 'video'],
		date: 'Thu Jul 17 2013 12:40:00 GMT-0400 (EDT)',
		uploadDate: 'Thu Jul 17 2013 12:45:21 GMT-0400 (EDT)',
		editDate: 'Thu Jul 17 2013 12:47:21 GMT-0400 (EDT)'
	},
	{
		id: 3,
        type: 'Metal',
		name: 'iron',
		uri: 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Iron_electrolytic_and_1cm3_cube.jpg/640px-Iron_electrolytic_and_1cm3_cube.jpg',
		fileName:'640px-Iron_electrolytic_and_1cm3_cube.jpg',
		mediaType:'image',
		tags:['iron', 'element', 'science', 'image'],
		date: 'Tue Jul 15 2013 5:42:00 GMT-0400 (EDT)',
		uploadDate: 'Wed Jul 16 2013 23:17:00 GMT-0400 (EDT)',
		editDate: 'Thu Jul 17 2013 10:10:25 GMT-0400 (EDT)'
	},
    {
        id: 4,
        type: 'Metal',
        name: 'iron2',
        uri: 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Iron_electrolytic_and_1cm3_cube.jpg/640px-Iron_electrolytic_and_1cm3_cube.jpg',
        fileName:'640px-Iron_electrolytic_and_1cm3_cube.jpg',
        mediaType:'image',
        tags:['iron', 'element', 'science', 'image'],
        date: 'Tue Jul 15 2013 5:42:00 GMT-0400 (EDT)',
        uploadDate: 'Wed Jul 16 2013 23:17:00 GMT-0400 (EDT)',
        editDate: 'Thu Jul 17 2013 10:10:25 GMT-0400 (EDT)'
    }
];
mockDataStore.vocabulary =  ['animal', 'giraffe', 'zoo', 'lisbon', 'portugal', 'spotted', 'neck', 'face', 'ears', 'space', 'science', 'video', 'zoologogy'];
mockDataStore.animalList = ['giraffe', 'monkey', 'gorilla', 'bird','elephant', 'tiger', 'lion']
