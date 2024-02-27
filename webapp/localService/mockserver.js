sap.ui.define(
  ["sap/ui/thirdparty/jquery", "sap/ui/core/util/MockServer", "sap/base/Log"],
  function (jQuery, MockServer, Log) {
    "use strict";

    return {
      /**
       * Initializes the mock server.
       * You can configure the delay with the URL parameter "serverDelay".
       * The local mock data in this folder is returned instead of the real data for testing.
       * @public
       */
      init() {
        // create
        const oMockServer = new MockServer({
          rootUri: "/",
        });

        oMockServer.simulate("../localService/metadata.xml", {
          sMockdataBaseUrl: "../localService/mockdata",
          bGenerateMissingMockData: true,
        });

        const aRequests = oMockServer.getRequests();

        aRequests.push({
          method: "GET",
          path: new RegExp("GetStoresList(.*)"),
          response: function (oXhr) {
            Log.debug("Incoming request for GetStoresList");
            jQuery.ajax({
              url: "/Stores",
              dataType: "json",
              async: false,
              success: function (oData) {
                oXhr.respondJSON(200, {}, JSON.stringify(oData));
              },
            });
            return true;
          },
        });
        oMockServer.setRequests(aRequests);

        // handling custom URL parameter step
        const fnCustom = function (oEvent) {
          const oXhr = oEvent.getParameter("oXhr");
          let sSellectStoreId = 0;
          if (oXhr && oXhr.url.indexOf("storeid") > -1) {
            oXhr.url.split("&").forEach((item) => {
              if (item.includes("storeid")) {
                sSellectStoreId = +item.split("=")[1];
              }
            });
            oEvent.getParameter("oFilteredData").results.splice(3, 100);
            // const oSellectSore = [];
            // oSellectSore.push(
            const sIndexOfStore = oEvent
              .getParameter("oFilteredData")
              .results.indexOf(
                oEvent
                  .getParameter("oFilteredData")
                  .results.find((store) => store.StoreID === sSellectStoreId)
              );
            // );
            // oEvent.setParameter("oFilteredData", {
            //   results: oSellectSore,
            // });
            // oEvent.getParameter("oFilteredData").results = [].push(
            //   oEvent
            //     .getParameter("oFilteredData")
            //     .results.find((store) => store.StoreID === sSellectStoreId)
            // );
          }
        };
        oMockServer.attachAfter("GET", fnCustom, "Stores");

        // start
        oMockServer.start();

        Log.info("Running the app with mock data");
      },
    };
  }
);