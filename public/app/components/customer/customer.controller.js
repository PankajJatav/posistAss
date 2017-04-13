/* * ************************************************************ 
 * Date: 14 Apr, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Customer Controller for perform customer operations
 * Typescript file customers.controller.js
 * *************************************************************** */

angular
.module('app')
.controller('CustomerCtrl', function($scope, toastr, $window, $state, $stateParams, Customer){
	$scope.sort = {};
	$scope.option = {};
	var perPageDoc = 10;
	$scope.currentPage = 1;
	$scope.customer = {
		addresses : [{}]
	}

	/**
		Author: Pankaj Jatav
		Desc  : Get Customer list based on option  
		
		param: option object option for custom list
	*/
	$scope.getCustomerList = function(option){
		Customer.list(option).then(
		function successCallback(response) {
			var data = response.data;
			if(data.success){
				$scope.customers = data.data;
			} else {
				$scope.customers = [];
			}
	  	}, function errorCallback(response) {
		    console.log(response);
	  	});
	};

	/**
		Author: Pankaj Jatav
		Desc  : Get Customer count based on option  
		
		param: option object option for custom list
	*/
	$scope.getCustomerCount = function(option){
		Customer.count(option).then(
		function successCallback(response) {
			var data = response.data;
			if(data.success){
				$scope.customersCount = data.data;
				var limit = $scope.option.limit ? $scope.option.limit : perPageDoc;
				$scope.maxPage = Math.ceil($scope.customersCount/limit);
				$scope.pages = [];
				for(var i = $scope.currentPage ; i > $scope.currentPage - 2 && i > 0 ; i -- ){
					$scope.pages.push(i);
				}
				for(var i = $scope.currentPage+1 ; i < $scope.currentPage + 3 && i <=  $scope.maxPage; i++){
					$scope.pages.push(i);
				}
				$scope.pages.sort();
			} else {
				$scope.customersCount = 1;
			}
	  	}, function errorCallback(response) {
		    console.log(response);
	  	});
	};

	/**
		Author: Pankaj Jatav
		Desc  : Get Custom to value to edit

	*/
	$scope.getEditCustomer = function(){
		Customer.getById({id:$stateParams.customerId}).then(
			function successCallback(response) {
				var data = response.data;
				if(data.success){
					$scope.customer = data.data;
				} else {
					toastr.error(data.message);
					$state.go('app.customer.list');
				}
		  	}, function errorCallback(response) {
			    console.log(response);
		  	});
	};

	/**
		Author: Pankaj Jatav
		Desc  : Call to get Customer report
	*/
	$scope.getCustomerReport = function(){
		Customer.getReport({id:$stateParams.customerId}).then(
			function successCallback(response) {
				var data = response.data;
				if(data.success){
					$scope.customerReport = data.data;
				} else {
					toastr.error(data.message);
					$state.go('app.customer.list');
				}
		  	}, function errorCallback(response) {
			    console.log(response);
		  	});
	};

	/**
		Author: Pankaj Jatav
		Desc  : call to change current page in pagination
	*/
	$scope.changePage = function(page){
		$scope.currentPage = page;
		$scope.option.skip = (page-1)*perPageDoc;
		$scope.getCustomerCount( $scope.option );
		$scope.getCustomerList( $scope.option );
	};

	/**
		Author: Pankaj Jatav
		Desc  : Call to remove Customer
		
		param: id string   id of customer
	*/
	$scope.removeCustomer = function(id){
		swal({
		  title: "Are you sure?",
		  text: "Your will not be able to recover customer!",
		  type: 'warning',
		  showCancelButton: true,
		  closeOnConfirm: false,
		  disableButtonsOnConfirm: true,
		  confirmLoadingButtonColor: '#DD6B55'
		}, function(inputValue){
			var removeData = {
				id:id
			}
		 	Customer.remove(removeData).then(
			function successCallback(response) {
				var data = response.data;
				if(data.success){
					swal(data.message, "success");
					$scope.getCustomerList($scope.option);
					$scope.getCustomerCount($scope.option);
				} else {
					swal(data.message, "error")
				}
		  	}, function errorCallback(response) {
			    console.log(response);
		  	});
		    
		  
		});
		
		
	}

	/**
		Author: Pankaj Jatav
		Desc  : Call to add new black address in customer form
		
		param: index int   index to add new adderess
	*/
	$scope.addAddress = function(index){
		$scope.customer.addresses.splice(index+1, 0, {});
	}

	/**
		Author: Pankaj Jatav
		Desc  : Call to add remove address in customer form
		
		param: index int   index to remove new adderess
	*/
	$scope.removeAddress = function(index){
		$scope.customer.addresses.splice(index, 1);
	}

	/**
		Author: Pankaj Jatav
		Desc  : Call to create new customer
	*/
	$scope.submit = function(){
		if(!$scope.customer.name){
			toastr.error('Name is required');
			return false;
		}

		if(!$scope.customer.mobile){
			toastr.error('Mobile Number is required');
			return false;
		}

		if(!$scope.customer.phone){
			toastr.error('Phone Number is required');
			return false;
		}

		if(!$scope.customer.dob){
			toastr.error('Date Of Birth is required');
			return false;
		}

		if(!$scope.customer.email){
			toastr.error('Email is required');
			return false;
		}

		if(isNaN(Date.parse($scope.customer.dob))){
			toastr.error('Enter valid date');
			return false;
		}
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!re.test($scope.customer.email)){
			toastr.error('Enter valid email address');
			return false;
		}
		if ( $state.current.name == 'app.customer.new' ) {
			Customer.new($scope.customer).then(
				function successCallback(response) {
					var data = response.data;
					toastr.success(data.message);
					if(data.success){
						$state.go('app.customer.list');
					}
			  	}, function errorCallback(response) {
				    console.log(response);
			  	});
		} else if ($state.current.name == 'app.customer.edit') {
			var updateData = {
				id: $stateParams.customerId,
				data: $scope.customer
			}
			Customer.update(updateData).then(
				function successCallback(response) {
					var data = response.data;
					toastr.success(data.message);
					if(data.success){
						$state.go('app.customer.list');
					}
			  	}, function errorCallback(response) {
				    console.log(response);
			  	});
		}
	}
	
	/**
		Author: Pankaj Jatav
		Desc  : Call to sort customer table
		
		param: index int   value which use for sorting
	*/
	$scope.sortTable = function(value){
		$scope.sort = {
			type : $scope.sort.type && $scope.sort.value ==value ? ($scope.sort.type =='asc' ? 'desc' : 'asc' ) : 'asc',
			value : value
		}
		$scope.option.sort = {};	
		$scope.option.sort[$scope.sort.value] = $scope.sort.type == 'asc' ? 1 : -1 ; 
		$scope.getCustomerList($scope.option);
	}

	/**
		Author: Pankaj Jatav
		Desc  : Call to search in customer table
	*/
	$scope.search = function() {
		if($scope.searchText) {
			$scope.option = {
				'filter' : {
					'$or' : [
						{ name: { '$regex' : $scope.searchText, '$options' : 'i' } },
						{ mobile: { '$regex' : $scope.searchText, '$options' : 'i' } },
						{ phone : { '$regex' : $scope.searchText, '$options' : 'i' } },
						{ dob : new Date($scope.searchText) },
						{ 'addresses' : { '$elemMatch': { 'flat' : {'$regex' : $scope.searchText, '$options' : 'i' } } } },
						{ 'addresses' : { '$elemMatch': { 'street' : {'$regex' : $scope.searchText, '$options' : 'i' } } } },
						{ 'addresses' : { '$elemMatch': { 'state' : {'$regex' : $scope.searchText, '$options' : 'i' } } } },
						{ 'addresses' : { '$elemMatch': { 'pin' : {'$regex' : $scope.searchText, '$options' : 'i' } } } },
					]
				}
			}
		} else {
			$scope.option.filter = {}
		}
		
		$scope.getCustomerList($scope.option);
		$scope.getCustomerCount($scope.option);
	}

	//Call speic method based on cureent location
	if($state.current.name == 'app.customer.list'){
		$scope.getCustomerList($scope.option);
		$scope.getCustomerCount($scope.option);
	} else if ( $state.current.name == 'app.customer.edit' ) {
		$scope.getEditCustomer();
	} else if ( $state.current.name == 'app.customer.new' ) {
		$scope.customer = {
			addresses : [{}]
		};
	} else if($state.current.name == 'app.customer.report'){
		$scope.getCustomerReport();
	} else {
	 	$state.go('app.customer.list');
	}
});