(function () {
'use strict';

angular.module('ShoppingListEventApp')
.component('shoppingListComponent', {
  templateUrl: 'SRC/ShoppingList1/shoppingList1.template.html',
  controller: ShoppingListComponentController,
  bindings: {
    listComponent: '<',
    titleComponent: '@',
    onRemove: '&'
  }
});


ShoppingListComponentController.$inject = ['$rootScope','$element', '$q', 'WeightLossFilterService']
function ShoppingListComponentController($rootScope , $element, $q,  WeightLossFilterService) {

  var $ctrl_temps = this;
  var TotleItems;

  $ctrl_temps.findcookies = function () {

    for(var i=0; i < $ctrl_temps.listComponent.getItems.length; i++)
    {
      var name = $ctrl_temps.listComponent.getItems[i].name;

      if(name.toLowerCase().indexOf("cookies") !== -1)
        return true;
    }
    return false;
  };


  $ctrl_temps.onInit = function () {
    TotleItems = 0;
  };

  $ctrl_temps.$doCheck = function () {

    if(TotleItems !== $ctrl_temps.listComponent.getItems.length)
    {
      TotleItems = $ctrl_temps.listComponent.getItems.length;

      $rootScope.$broadcast('ShoppingList: processing', { on : true });


      var promisses = [];

      for (var i = 0; i < $ctrl_temps.listComponent.getItems.length; i++) {
       promisses.push(WeightLossFilterService.CheckName($ctrl_temps.listComponent.getItems[i].name));
      }

      $q.all(promisses)
      .then(function (result) {
        var WarningMessage = $element.find('div.error')
        WarningMessage.slideUp(300);
      })
      .catch(function (result) {
        var WarningMessage = $element.find('div.error')
        WarningMessage.slideDown(300);
      })
      .finally(function () {
        $rootScope.$broadcast('ShoppingList: processing', { on : false });
      })



    }

  }





};


})();
