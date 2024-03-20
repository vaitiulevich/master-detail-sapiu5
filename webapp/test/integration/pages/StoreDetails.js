sap.ui.define(
  ["sap/ui/test/Opa5", "sap/ui/test/actions/Press"],
  function (Opa5, Press) {
    "use strict";

    const sViewName = "StoreDetails",
      sStoreDetailsId = "storeDetails";
    Opa5.createPageObjects({
      onTheStoreDetailsPage: {
        actions: {},

        assertions: {
          iShouldSeeTheStoreDetailsPage: function () {
            return this.waitFor({
              id: sStoreDetailsId,
              viewName: sViewName,
              success: function () {
                Opa5.assert.ok(true, "The StoreDetails view is displayed");
              },
              errorMessage: "Did not find the StoreDetails view",
            });
          },
        },
      },
    });
  }
);
