function AppCtrl ($scope, $log, $location) {
	$log.info('in app')
	var latestId = utils.getMaxId();
	var path = '/resource/' + latestId;
	$location.path(path);
}

function ResourceCtrl ($scope, $routeParams, $log, $location, $sce) {
	$log.info('in resource controller');
    $scope.orgVoc = "Original Vocab";
	$scope.resources = mockDataStore.resources;
	$scope.vocabulary;
	// TODO: validate id
	// TODO: change mock data store to provider?
	// TODO: create find method?
	var id = $routeParams.id;
	var currentResource;
    $scope.currentResource = currentResource;

	for (resource in mockDataStore.resources) {
		if (mockDataStore.resources[resource].id == id) {
			currentResource = mockDataStore.resources[resource];
			break;
		}
	}

	if(typeof(currentResource) == 'undefined') {
		$location.path('/resource/' + utils.getMaxId());
	}

	$scope.currentResource = currentResource;
	for (i in $scope.resources) {
		if ($scope.resources[i].id == currentResource.id) {
			$scope.resources[i].className = 'current-resource';
		} else {
			$scope.resources[i].className = '';
		}
	}

    $scope.tabs = [
        {title:'Animal', currentCategory: false},
        {title:'Space', currentCategory: false},
        {title:'Metal', currentCategory: false}
    ];
    $scope.tabs.activeTab;

    $scope.changeTab = function(currentTab)
    {
        var setCurrentTab = currentTab

        for(tab in $scope.tabs)
        {
            if(setCurrentTab != $scope.tabs[tab].title)
            {
                if($scope.tabs[tab].currentCategory === true)
                {
                    $scope.tabs[tab].currentCategory = false;
                }
            }
            if(setCurrentTab === $scope.tabs[tab].title)
            {
                if($scope.tabs[tab].currentCategory === true)
                {
                    $scope.tabs[tab].currentCategory = false;
                }
                else
                {
                    $scope.tabs[tab].currentCategory = true;
                }
            }

        }
    }
	// TODO: ditch in favor of vanilla boostrap ui implementation?

	// (this was already done for add resource)
    $scope.setLoadVocab = false;

    $scope.loadVocab = function()
    {
        if($scope.setLoadVocab === true)
        {
            $scope.vocabulary = mockDataStore.vocabulary;
        }
        if($scope.setLoadVocabAnimal === true)
        {
            $scope.vocabulary = mockDataStore.animalList;
        }
        var dialog =  $('#vocab-modal');
        dialog.modal('toggle');
    }
    //currentResource.uri = $sce.trustAsResourceUrl(currentResource.uri);
}

// TODO: move these functions into model?
var utils = {};

utils.VIDEO_EXTENSIONS = ['mp4', 'webm'];
utils.AUDIO_EXTENSIONS = ['mp3'];
utils.IMAGE_EXTENSIONS = ['jpg', 'gif', 'png'];
utils.VIDEO_MEDIA = 'video';
utils.AUDIO_MEDIA = 'audio';
utils.IMAGE_MEDIA = 'image';

utils.getMediaType = function(uri) {
	// we'll be basing media type on extension rather than
	// mime type for now...
	var fn = utils.getFileName(uri);
	var fnParts = fn.split('.');
	var extension = fnParts[fnParts.length - 1];
	var mediaType;
	if (utils.VIDEO_EXTENSIONS.indexOf(extension) >= 0) {
		mediaType = utils.VIDEO_MEDIA;
	} else if(utils.IMAGE_EXTENSIONS.indexOf(extension) >= 0) {
		mediaType = utils.IMAGE_MEDIA;
	} else if(utils.AUDIO_EXTENSIONS.indexOf(extension) >= 0) {
		mediaType = utils.AUDIO_MEDIA;
	} else {
		mediaType = 'unknown';
	}
	return mediaType;
}

utils.getFileName = function(uri)
{
    var uriParts = uri.split('/');
    // TODO: cover edge cases
    return uriParts[uriParts.length - 1];
}

utils.extractMetaData = function(uri) {
	var metaData = {};
	metaData.mediaType = utils.getMediaType(uri);
	metaData.fileName = utils.getFileName(uri);
	return metaData;
}

utils.getMaxId = function() {
	var max = mockDataStore.resources[0].id;
	for (i in mockDataStore.resources) {
		if (mockDataStore.resources[i].id > max) {
			max = mockDataStore.resources[i].id;
		}
	}
	return max;
}



function ResourceAddCtrl($scope, $location, $log, $sce){
	$scope.resource = {};
	$scope.addResource = function(){
        var newUri = $scope.resource.uri;
        if(newUri.charAt(newUri.length - 1) === '/')
        {
            newUri = newUri.substring(0, newUri.length -1);
        }
		var resource = utils.extractMetaData(newUri);

		resource.name = $scope.resource.name;
		resource.id = utils.getMaxId() + 1;
		var userTags = $scope.resource.tags.split(',');
		$log.info($scope.resource.tags);
		$log.info(userTags);
		var tagsToSave = [];
		for(var i = 0; i < userTags.length; i++) {
			var userTag = userTags[i].trim();
			$log.info(userTag);
			if(mockDataStore.vocabulary.indexOf(userTag) > -1) {
				tagsToSave.push(userTag);
			}
		}
		resource.tags = tagsToSave;
		resource.date = Date();
		resource.editDate = Date();
		resource.uploadDate = Date();
		$log.info(resource);
		$log.info(resource.tags);
		mockDataStore.resources.push(resource);
		var dialog =  $('#resource-modal');
		$log.info(dialog);
		dialog.modal('toggle');
		// TODO: use generated id
		var path = '/resource/' + resource.id;
		$location.path(path);
	};

	$scope.autocompleteOptions = {
		minLength: 0,
		source: function( request, response ) {
			// delegate back to autocomplete, but extract the last term
			response($.ui.autocomplete.filter($scope.vocabulary, extractLast(request.term)));
		},
		focus: function() {
			// prevent value inserted on focus
			return false;
		},
		select: function( event, ui ) {
			var terms = split( this.value );
			// remove the current input
			terms.pop();
			// add the selected item
			terms.push( ui.item.value );
			// add placeholder to get the comma-and-space at the end
			terms.push( "" );
			this.value = terms.join( ", " );
			// hack to get automplete working with last element
			// see http://stackoverflow.com/questions/17109850/update-angular-model-after-setting-input-value-with-jquery
			$(this).trigger('input');
			return false;
		},
		delay: 500
	};
}

function VocabLoadCtrl($scope)
{

}

//Splits tags into separate objects from a list
function VocabularyLoadCtrl($scope, $location, $log, dialog){
    $scope.vocabulary = {};
    $scope.loadVocabulary = function(){
        var tags = $scope.vocabulary.csv.split(',');
        $scope.vocabulary.length = 0;
        for(t in tags) {
            $scope.vocabulary.push(tags[t].trim());
        }
        dialog.close();
    };
}

// TODO: move these utility functions into a module
// (both are used by jquery autocomplete multiple in autocompleteOptions)
function split( val ) {
	return val.split( /,\s*/ );
}

function extractLast( term ) {
	return split( term ).pop();
}
