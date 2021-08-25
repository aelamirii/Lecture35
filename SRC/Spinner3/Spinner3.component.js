(function () {
'use strict';

angular.module('SpinnerApp')
.component('spinnerComponent', {
  templateUrl: 'SRC/Spinner3/Spinner3.template.html',
  controller: SpinnerController
});

// function SpinnerController() {
//
//   console.log("1111111111111111");
//
// };

SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {



  var $ctrl_temps = this;


  $rootScope.$on('ShoppingList : processing', function (event, data) {

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
