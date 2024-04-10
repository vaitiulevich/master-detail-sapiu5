sap.ui.define(
  [
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/Properties",
    "sap/ui/test/matchers/AggregationLengthEquals",
    "sap/ui/test/matchers/Descendant",
  ],
  function (
    Opa5,
    Press,
    EnterText,
    Properties,
    AggregationLengthEquals,
    Descendant
  ) {
    "use strict";

    const sViewName = "StoreDetails",
      sStoreDetailsId = "storeDetails",
      sProductsTableId = "productsTable",
      sProductSearchFieldId = "productSearchField";
    Opa5.createPageObjects({
      onTheStoreDetailsPage: {
        actions: {
          iEnterProductTitle: function (sProductTitle) {
            return this.waitFor({
              id: sProductSearchFieldId,
              controlType: "sap.m.SearchField",
              viewName: sViewName,
              actions: new EnterText({
                text: sProductTitle,
              }),
              errorMessage: "Input was not found.",
            });
          },
        },

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
          iShouldSeeProductsList: function () {
            return this.waitFor({
              id: sProductsTableId,
              viewName: sViewName,
              success: function (sTitle) {
                return this.waitFor({
                  controlType: "sap.m.ColumnListItem",
                  matchers: new Descendant(sTitle[0]),
                  success: function () {
                    Opa5.assert.ok(true, "The title was visible");
                  },
                  errorMessage:
                    "Did not find row or special text is not inside table row",
                });
              },
              errorMessage: "The title input didn't match the correct value",
            });
          },
          iShouldSeeProductTable: function () {
            return this.waitFor({
              id: sProductsTableId,
              viewName: sViewName,
              success: function () {
                Opa5.assert.ok(true, "The Products table is displayed");
              },
              errorMessage: "Did not find Products table view",
            });
          },
        },
      },
    });
  }
);
