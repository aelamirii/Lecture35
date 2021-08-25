(function () {
'use strict';

angular.module('ShoppingListEventApp')
.service('WeightLossFilterService', WeightLossFilterService);

WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {

  var service = this;

  service.CheckName = function (Name) {

    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {

      if(Name.toLowerCase().indexOf("cookies") === -1)
      deferred.resolve(result);
      else {
        result.message = "cokkies is detectedd";
        deferred.reject(result);
      }

    }, 1000);

    return deferred.promise;
  };

};




})();
