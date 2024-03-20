sap.ui.define(
  ["sap/ui/test/opaQunit", "./pages/StoresOverview", "./pages/StoreDetails"],
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
      Then.onTheStoreDetailsPage.iShouldSeeTheStoreDetailsPage();
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
