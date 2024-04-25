sap.ui.define(
  [
    "sap/ui/test/opaQunit",
    "kate/vaitsiulevich/test/integration/pages/StoresOverview",
    "kate/vaitsiulevich/test/integration/pages/StoreDetails",
  ],
  function (opaTest) {
    "use strict";

    QUnit.module("Stores");

    opaTest("Should see the list of all stores", function (Given, When, Then) {
      Given.iStartMyApp();
      Then.onTheStoresOverviewPage.iShouldSeeTheStoresOverview();
    });

    opaTest("Should see the selected store", function (Given, When, Then) {
      When.onTheStoresOverviewPage.iSelectStore();
      Then.onTheStoreDetailsPage
        .iShouldSeeTheStoreDetailsPage()
        .and.iShouldSeeProductTable();
    });

    opaTest("Should enter store title", function (Given, When, Then) {
      When.onTheStoresOverviewPage.iEnterStoreTitle("store");
      Then.onTheStoresOverviewPage.iShouldSeeStoresList("store");
    });

    QUnit.module("Products");

    opaTest("Should enter product title", function (Given, When, Then) {
      When.onTheStoreDetailsPage.iEnterProductTitle("product");
      Then.onTheStoreDetailsPage.iShouldSeeProductsList();
    });
  }
);
