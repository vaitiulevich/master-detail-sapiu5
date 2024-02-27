sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("kate.vaitsiulevich.controller.StoreDetails", {
    /**
     * Controller's "init" lifecycle method.
     *
     * @public
     */
    onInit() {
      const oComponent = this.getOwnerComponent();
      const oRouter = oComponent.getRouter();
      oRouter
        .getRoute("StoreDetails")
        .attachPatternMatched(this.onPatternMatched, this);
    },
    /**
     * "StoreDetails" route pattern matched event handler.
     *
     * @param {sap.ui.base.Event} oEvent event object.
     *
     * @public
     *
     */
    onPatternMatched(oEvent) {
      const that = this;
      const mRouteArguments = oEvent.getParameter("arguments");
      const sStoreID = mRouteArguments.StoreID;
      const oODataModel = this.getView().getModel();

      oODataModel.metadataLoaded().then(() => {
        const sKey = "/Stores(" + sStoreID + ")";
        // const sKey = oODataModel.createKey("/Stores", { id: sStoreID });
        that.getView().bindObject({ path: sKey });
      });
    },
  });
});
