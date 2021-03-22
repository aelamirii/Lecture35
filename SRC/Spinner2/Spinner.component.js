(function () {
'use strict';

angular.module('SpinnerApp')
.component('spinnerComponent', {
  templateUrl: 'SRC/Spinner2/Spinner.template.html',
  controller: SpinnerController
});

SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {

  var $ctrl_temps = this;


  $rootScope.$on('ShoppingList: Processing', function (event, data) {

    console.log("Event :", event);
    console.log("Data :", data);

    if(data.on)
    {
      $ctrl_temps.loadingSpinner = true;
    }
    else {
      $ctrl_temps.loadingSpinner = false;
    }

  })

};



})();
