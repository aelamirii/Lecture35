(function () {
'use strict';

angular.module('SpinnerApp')
.component('spinnerLoading', {
  templateUrl: 'SRC/Spinner4/Spinner4.template.html',
  controller: SpinnerComponentController
});

SpinnerComponentController.$inject = ['$rootScope'];
function SpinnerComponentController($rootScope) {

  var $ctrl = this;

  $rootScope.$on('ShoppingList: processing', function (event, data) {

    console.log("Event :", event);
    console.log("Data :", data);

    if(data.on)
    {
      $ctrl.SpinnerLoading = true;
    }
    else {
      $ctrl.SpinnerLoading = false;
    }


  });

}



})();
