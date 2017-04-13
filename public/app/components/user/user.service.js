/* * ************************************************************ 
 * Date: 14 Apr, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : User Service for perform user http request to server
 * Typescript file user.service.js
 * *************************************************************** */

angular
.module('app')
.service('User', function($http) {

    /**
        Author: Pankaj Jatav
        Desc  : Call to login user
        
        param: username string   username of user
        param: password string   password of user
    */
    this.login = function (username, password) {
        var data = {
        	method: 'POST',
  			url: '/api/user/login',
        	data: {
        		username: username,
        		password: password
        	}
        };
        return $http(data);

    }
});