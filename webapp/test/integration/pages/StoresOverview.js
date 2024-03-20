sap.ui.define(
  ["sap/ui/test/Opa5", "sap/ui/test/actions/Press"],
  function (Opa5, Press) {
    "use strict";

    const sViewName = "StoresOverview",
      sStoresOverviewId = "storesOverview";
    Opa5.createPageObjects({
      onTheStoresOverviewPage: {
        actions: {
          iSelectStore: function () {
            return this.waitFor({
              id: "listStores",
              controlType: "sap.m.StoresOverview",
              viewName: sViewName,
              actions: new Press(),
              errorMessage: "ActionSelect was not found.",
            });
          },
        },

        assertions: {
          iShouldSeeTheStoresOverview: function () {
            return this.waitFor({
              id: sStoresOverviewId,
              viewName: sViewName,
              success: function () {
                Opa5.assert.ok(true, "The StoresOverview view is displayed");
              },
              errorMessage: "Did not find the StoresOverview view",
            });
          },
        },
      },
    });
  }
);
