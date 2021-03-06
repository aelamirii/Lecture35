(function () {
'use strict';

angular.module('ShoppingListEventApp')
.controller('ShoppingListController', ShoppingListController);


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = "Shopping List 1 ";
  list.titleController = Org_Title + " ( "+ list.getItems.length +" ) ";

  list.addItem = function () {

    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity);
      list.titleController = Org_Title + " ( "+ list.getItems.length +" ) ";
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }

  };

  list.RemoveItem = function (indexItem) {
    console.log("this is ", this);
    this.LastItemRemoved = list.getItems[indexItem].name;
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
    list.titleController = Org_Title + " ( "+ list.getItems.length +" ) ";
  }


}


})();
