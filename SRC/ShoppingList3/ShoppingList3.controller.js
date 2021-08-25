(function () {
'use strict';


angular.module('ShoppingListApp')
.controller('ShoppingListController', ShoppingListController);


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory(3);

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = " Shopping List count ";
  list.Title_Controller = Org_Title + "("+list.getItems.length+")";

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity);
      list.Title_Controller = Org_Title + "("+list.getItems.length+")";
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }
  };

  list.RemoveItem = function (indexItems) {
    ShoppingList.RemoveItem(indexItems);
    list.Title_Controller = Org_Title + "("+list.getItems.length+")";
  };


}


})();
