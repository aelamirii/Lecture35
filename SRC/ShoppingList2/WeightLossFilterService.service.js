(function () {
'use strict';

angular.module('ShoppingListEventApp')
.service('WeightLossFilterService', WeightLossFilterService);

WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {

  var service = this;

  service.CheckName = function (name) {

    var deferrer = $q.defer();

    var result = {
      message: ""
    };

  $timeout(function () {

    if(name.toLowerCase().indexOf("cookies") === -1)
    {
      deferrer.resolve(result);
    }
    else {
      result.message = "cookies detected";
      deferrer.reject(result);
    }


  },500);

  return deferrer.promise;
};

};



})();
