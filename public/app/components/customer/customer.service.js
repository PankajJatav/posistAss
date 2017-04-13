/* * ************************************************************ 
 * Date: 14 Apr, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Customer Service for perform customer http request to server
 * Typescript file customers.service.js
 * *************************************************************** */

angular
.module('app')
.service('Customer', function($http) {

    /**
        Author: Pankaj Jatav
        Desc  : Get Customer list based on option  
        
        param: option object option for custom list
    */
    this.list = function (options) {
        var data = {
        	method: 'POST',
  			url: '/api/customer/list',
        	data: options
        };
        return $http(data);
    },

    /**
        Author: Pankaj Jatav
        Desc  : Get Customer count based on option  
        
        param: option object option for custom list
    */
    this.count = function (options) {
        var data = {
            method: 'POST',
            url: '/api/customer/count',
            data: options
        };
        return $http(data);
    },

    /**
        Author: Pankaj Jatav
        Desc  : Call to create Customer 
        
        param: option object data of customer
    */
    this.new = function (options) {
        var data = {
        	method: 'POST',
  			url: '/api/customer/create',
        	data: options
        };
        return $http(data);
    },

    /**
        Author: Pankaj Jatav
        Desc  : Call to update Customer 
        
        param: option object data to update
    */
    this.update = function (options) {
        var data = {
        	method: 'POST',
  			url: '/api/customer/update',
        	data: options
        };
        return $http(data);
    },

    /**
        Author: Pankaj Jatav
        Desc  : Call to get Customer by id
        
        param: option object id of customer
    */
    this.getById = function(options){
    	var data = {
        	method: 'POST',
  			url: '/api/customer/getById',
        	data: options
        };
        return $http(data);
    },

    /**
        Author: Pankaj Jatav
        Desc  : Call to remove Customer 
        
        param: option object customer id
    */
    this.remove = function(options){
    	var data = {
        	method: 'DELETE',
  			url: '/api/customer/remove',
        	data: options,
        	headers: {'Content-Type': 'application/json;charset=utf-8'}
        };
        return $http(data);
    },

    /**
        Author: Pankaj Jatav
        Desc  : Call to get report of Customer 
        
        param: option object customer id
    */
    this.getReport = function(options){
    	var data = {
        	method: 'POST',
  			url: '/api/customer/getReport',
        	data: options,
        };
        return $http(data);
    }
});