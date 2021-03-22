(function () {
'use strict';

angular.module('ShoppingListEventApp')
.service('WeightLossFilterService', WeightLossFilterService);


WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {

  var service = this;

  service.CheckName = function (name) {

    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {

      if(name.toLowerCase().indexOf("cookies") === -1)
      {
        deferred.resolve(result);
      }
      else {
        result.message = "cookies detected";
        deferred.reject(result);
      }

    }, 500);

    return deferred.promise;
  };

};




})();
