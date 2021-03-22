(function () {
'use strict';

angular.module('SpinnerApp')
.component('spinnerComponent', {
  templateUrl: 'SRC/Spinner1/spinner.template.html',
  controller: SpinnerController
});


SpinnerController.$inject = ['$rootScope'];
function SpinnerController($rootScope) {

  var $ctrl_temps = this;


  $rootScope.$on('ShoppingList: processing', function (event, data) {

    console.log("Event: ", event);
    console.log("Data: ", data);

    if(data.on)
    {
        $ctrl_temps.loadingSpinner = true;
    }
    else {
      $ctrl_temps.loadingSpinner = false;
    }

  });

};



})();
