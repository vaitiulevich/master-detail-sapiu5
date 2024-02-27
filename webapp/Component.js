sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/demo/MockServer/localService/mockserver"],
  function (UIComponent, mockserver) {
    "use strict";

    return UIComponent.extend("kate.vaitsiulevich.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        // initialize the mock server
        mockserver.init();

        // initialize the embedded component on the HTML page
        sap.ui.require(["sap/ui/core/ComponentSupport"]);

        this.getRouter().initialize();
      },
    });
  }
);
