(function () {
'use strict';

angular.module('ShoppingListEventApp')
.component('shoppingListComponent', {
  templateUrl: 'SRC/ShoppingList2/ShoppingList2.template.html',
  controller: ShoppingListComponentController,
  bindings: {
    listComponent: '<',
    titleComponent: '@',
    onRemove: '&'
  }
});


ShoppingListComponentController.$inject = ['$rootScope', '$q', '$element','WeightLossFilterService']
function ShoppingListComponentController($rootScope, $q, $element, WeightLossFilterService) {

  var $ctrl_temps = this;
  var Total_Items;

  $ctrl_temps.findcookies = function () {

    for (var i = 0; i < $ctrl_temps.listComponent.getItems.length; i++) {
      var name = $ctrl_temps.listComponent.getItems[i].name;
      if(name.toLowerCase().indexOf("cookies") !== -1)
      return true;
    }
    return false;
  };

  $ctrl_temps.remove = function (Index_Key) {
    $ctrl_temps.onRemove( { index_KEY : Index_Key });
  };


  $ctrl_temps.$onInit = function () {
    Total_Items = 0;
  };


  $ctrl_temps.$doCheck = function () {

    var promisses = [];

    if(Total_Items !== $ctrl_temps.listComponent.getItems.length)
    {
      Total_Items = $ctrl_temps.listComponent.getItems.length;

      $rootScope.$broadcast('ShoppingList: Processing', {on : true});

    for (var i = 0; i < $ctrl_temps.listComponent.getItems.length; i++) {
      promisses.push(WeightLossFilterService.CheckName($ctrl_temps.listComponent.getItems[i].name));
    }

    $q.all(promisses)
    .then(function (result) {
      var WarningMessage = $element.find('div.error');
      WarningMessage.slideUp(300);
    })
    .catch(function () {
      var WarningMessage = $element.find('div.error');
      WarningMessage.slideDown(300);
    })
    .finally(function () {
      $rootScope.$broadcast('ShoppingList: Processing', {on : false});
    });

    }



  };



}



})();
