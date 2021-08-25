(function () {
'use strict';

angular.module('ShoppingListEventApp')
.component('shoppingListComponent', {
  templateUrl: 'SRC/ShoppingList4/ShoppingList4.template.html',
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

  var Total_Item ;

  $ctrl.findcookies = function () {

  for (var i = 0; i < $ctrl.listComponent.getItems.length; i++) {
    var name = $ctrl.listComponent.getItems[i].name;
    if(name.toLowerCase().indexOf("cookies") !== -1)
    return true;
  }
    return false;
  };


  $ctrl.remove = function (index) {
    $ctrl.onRemove( { Index_Key : index} );
  };


  $ctrl.$on = function () {
    Total_Item = 0;
  };

  $ctrl.$doCheck = function () {

    if(Total_Item !== $ctrl.listComponent.getItems.length)
    {
      Total_Item = $ctrl.listComponent.getItems.length;


      $rootScope.$broadcast('ShoppingList: processing', { on : true });

      var promisses = [];

      for (var i = 0; i < $ctrl.listComponent.getItems.length; i++) {
        promisses.push( WeightLossFilterService.CheckName($ctrl.listComponent.getItems[i].name) );
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
        $rootScope.$broadcast('ShoppingList: processing', { on : false });
      });

    }


  }



};





})();
