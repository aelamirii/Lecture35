(function () {
'use strict';

angular.module('ShoppingListApp')
.component('shoppingList', {
  templateUrl: 'SRC/ShoppingList3/ShoppingList3.template.html',
  controller: ShoppingListComponentController,
  bindings: {
    listComponent: '<',
    titleComponent: '@',
    onRemove: '&'
  }
});


ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService) {

  var $ctrl = this;

  var Total_Items;

  $ctrl.$on = function () {
    Total_Items = 0;
  };

  $ctrl.$doCheck = function () {

    if(Total_Items !== $ctrl.listComponent.getItems.length)
    {
      Total_Items = $ctrl.listComponent.getItems.length;

      $rootScope.$broadcast('ShoppingList : processing', { on : true });

      var promises = [];

      for (var i = 0; i < $ctrl.listComponent.getItems.length; i++) {
        promises.push(WeightLossFilterService.CheckName($ctrl.listComponent.getItems[i].name));
      }

      $q.all(promises)
      .then(function (result) {
        var WarningMessage = $element.find('div.error');
        WarningMessage.slideUp(300);
      })
      .catch(function () {
        var WarningMessage = $element.find('div.error');
        WarningMessage.slideDown(300);
      })
      .finally(function () {
        $rootScope.$broadcast('ShoppingList : processing', { on : false });
      });




    }


  }

}





})();
