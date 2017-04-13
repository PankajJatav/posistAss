/* * ************************************************************ 
 * Date: 14 Apr, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : User Controller for perform user operations
 * Typescript file customers.controller.js
 * *************************************************************** */

angular
.module('app')
.controller('UserCtrl', function($scope, toastr, $window, $state, User){

    /**
        Author: Pankaj Jatav
        Desc  : Call to login user
    */
	$scope.login = function(){
    	
    	if(!$scope.username){
    		toastr.error('Please enter username');
    		return false;
    	}
    	
    	if(!$scope.password){
    		toastr.error('Please enter password');
    		return false;
    	}

    	User.login($scope.username, $scope.password).then(
    		function successCallback(response) {
    			var data = response.data;
    			if(data.success){
    				toastr.success(data.message);
    				$window.sessionStorage.token = data.token;
    				$state.go('app.customer.list');
    				console.log('Not Going');
    			} else {
    				delete $window.sessionStorage.token;
    				toastr.error(data.message);
    			}
		  	}, function errorCallback(response) {
			    console.log(response);
		  	});
	}
})