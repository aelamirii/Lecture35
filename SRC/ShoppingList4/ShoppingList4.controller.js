(function () {
'use strict';

angular.module('ShoppingListEventApp')
.controller('ShoppingListController', ShoppingListController);


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory(3);

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = " Shopping List count ";
  list.Title_Controller = Org_Title + "("+ list.getItems.length +")";

  list.addItem = function () {

    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity);
      list.Title_Controller = Org_Title + "("+ list.getItems.length +")";
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }

  };

  list.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
    list.Title_Controller = Org_Title + "("+ list.getItems.length +")";
  };

};



})();
