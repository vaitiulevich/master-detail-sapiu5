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

    const sViewName = "StoresOverview",
      sStoresOverviewId = "storesOverview",
      sStoreSearchFieldId = "storeSearchField",
      sListStoresId = "listStores";
    Opa5.createPageObjects({
      onTheStoresOverviewPage: {
        actions: {
          iSelectStore: function () {
            return this.waitFor({
              controlType: "sap.m.ObjectListItem",
              viewName: sViewName,
              actions: new Press(),
              errorMessage: "ActionSelect was not found.",
            });
          },
          iEnterStoreTitle: function (sStoreTitle) {
            return this.waitFor({
              id: sStoreSearchFieldId,
              controlType: "sap.m.SearchField",
              viewName: sViewName,
              actions: new EnterText({
                text: sStoreTitle,
              }),
              errorMessage: "Input was not found.",
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
          iShouldSeeStoresList: function () {
            return this.waitFor({
              id: sListStoresId,
              viewName: sViewName,
              success: function (sTitle) {
                return this.waitFor({
                  controlType: "sap.m.ObjectListItem",
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
        },
      },
    });
  }
);
