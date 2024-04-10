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
      // Arrangements
      Given.iStartMyApp();

      // Assertions
      Then.onTheStoresOverviewPage.iShouldSeeTheStoresOverview();
    });

    opaTest("Should see the selected store", function (Given, When, Then) {
      When.onTheStoresOverviewPage.iSelectStore();

      // Assertions
      Then.onTheStoreDetailsPage
        .iShouldSeeTheStoreDetailsPage()
        .and.iShouldSeeProductTable();
    });

    opaTest("Should enter store title", function (Given, When, Then) {
      // Actions
      When.onTheStoresOverviewPage.iEnterStoreTitle("store");

      // Assertions
      Then.onTheStoresOverviewPage.iShouldSeeStoresList("store");
    });

    QUnit.module("Products");

    opaTest("Should enter product title", function (Given, When, Then) {
      // Actions
      When.onTheStoreDetailsPage.iEnterProductTitle("product");

      // Assertions
      Then.onTheStoreDetailsPage.iShouldSeeProductsList();
    });
    // opaTest(
    //   "Should see the table with all posts",
    //   function (Given, When, Then) {
    //     // Arrangements
    //     Given.iStartMyStoresOverview();

    //     // Assertions
    //     Then.onTheWorklistPage
    //       .theTableShouldHavePagination()
    //       .and.theTitleShouldDisplayTheTotalAmountOfItems();
    //   }
    // );

    // opaTest("Should be able to load more items", function (Given, When, Then) {
    //   //Actions
    //   When.onTheWorklistPage.iPressOnMoreData();

    //   // Assertions
    //   Then.onTheWorklistPage.theTableShouldHaveAllEntries();

    //   // Cleanup
    //   Then.iTeardownMyStoresOverview();
    // });
  }
);
