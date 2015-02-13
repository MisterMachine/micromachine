angular.module("micromachine")
  .constant("clientUrl", "http://localhost:3000/clients")
  .config(function($httpProvider) {
    //$httpProvider.defaults.withCredentials = true;
  })
  .controller("ClientController", function ($scope, $resource, clientUrl) {

    // Create an access object to the REST API
    $scope.clientsResource = $resource(clientUrl + ":id", { id: "@id" });

    $scope.listClients = function () {
      $scope.clients = $scope.clientsResource.query();
    }

    $scope.deleteClient = function (client) {
      client.$delete().then(function () {
        $scope.clients.splice($scope.clients.indexOf(client), 1);
      });
    }

    $scope.createClient = function(client) {
      new $scope.clientsResource(client).$save().then(function (newClient) {
        $scope.clients.push(newClient);
        $scope.editedClient = null;
      });
    }

    $scope.updateClient = function (client) {
      client.$save();
      $scope.editedClient = null;
    }

    $scope.startEdit = function (client) {
      $scope.editedClient = client;
    }

    $scope.cancelEdit = function () {
      $scope.editedClient = null;
    }

    $scope.listClients();

  });
