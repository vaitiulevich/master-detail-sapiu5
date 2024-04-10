sap.ui.define(
  ["sap/ui/core/util/MockServer", "sap/base/Log"],
  function (MockServer, Log) {
    "use strict";

    return {
      /**
       * Initializes the mock server.
       * You can configure the delay with the URL parameter "serverDelay".
       * The local mock data in this folder is returned instead of the real data for testing.
       * @public
       */
      init() {
        const oMockServer = new MockServer({
          rootUri: "/",
        });

        oMockServer.simulate("../localService/metadata.xml", {
          sMockdataBaseUrl: "../localService/mockdata",
          bGenerateMissingMockData: true,
        });

        const aRequests = oMockServer.getRequests();
        aRequests.push({
          method: "DELETE",
          path: new RegExp("FindUpcomingMeetups(.*)"),
          response: function (oXhr) {
            Log.debug("Incoming request for FindUpcomingMeetups");
            jQuery.ajax({
              url: "/Products",
              dataType: "json",
              async: false,
              success: function (oData) {
                oXhr.respondJSON(200, {}, JSON.stringify(oData));
              },
            });
            return true;
          },
        });
        aRequests.push({
          method: "DELETE",
          path: new RegExp("FindUpcomingMeetups(.*)"),
          response: function (oXhr) {
            Log.debug("Incoming request for FindUpcomingMeetups");
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

        oMockServer.start();

        Log.info("Running the app with mock data");
      },
    };
  }
);
