sap.ui.define(
  ["kate/vaitsiulevich/controller/StoresOverview.controller"],
  function (AppController) {
    "use strict";

    QUnit.module("test group");

    QUnit.test(
      "standalone controller method w/o dependencies",
      function (assert) {
        // arrangement
        var oController = new AppController();

        // action
        oController.onInit();

        // assertions
        // assert.ok(oController.aSearchFilters);
        // assert.ok(oController.aTabFilters);
        assert.ok();
      }
    );
  }
);
