(function () {
'use strict';

angular.module('ShoppingListEventApp')
.component('shoppingListComponent', {
  templateUrl: 'SRC/ShoppingList/shoppingList.template.html',
  controller: ShoppingListComponentController,
  bindings: {
    listComponent: '<',
    titleComponent: '@',
    onRemove: '&'
  }
});



ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
function ShoppingListComponentController( $rootScope, $element, $q, WeightLossFilterService) {

  var $ctrl_temps = this;
  var totlaItems;

  $ctrl_temps.findcookies = function () {

    for (var i = 0; i < $ctrl_temps.listComponent.getItems.length; i++) {
      var name = $ctrl_temps.listComponent.getItems[i].name;
      if(name.toLowerCase().indexOf("cookies") !== -1)
      return true;
    }
    return false;
  };


  $ctrl_temps.$onInit = function () {
    totlaItems = 0;
  };


  $ctrl_temps.$doCheck = function () {

    if( totlaItems !== $ctrl_temps.listComponent.getItems.length)
    {

       totlaItems = $ctrl_temps.listComponent.getItems.length;

       $rootScope.$broadcast('ShoppingList : processing', { on : true});

       var promises = [];

       for(var i=0; i < $ctrl_temps.listComponent.getItems.length; i++ )
        promises.push(WeightLossFilterService.CheckName($ctrl_temps.listComponent.getItems[i].name));


        $q.all(promises)
        .then(function (result) {
          var WarningMessage = $element.find('div.error');
          WarningMessage.slideUp(500);
        })
        .catch(function (result) {
          var WarningMessage = $element.find('div.error');
          WarningMessage.slideDown(500);
        })
        .finally(function () {
          $rootScope.$broadcast('ShoppingList : processing', { on : false});
        })


    }

  };

};




})();
