sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("kate.vaitsiulevich.controller.ProductDetails", {
    /**
     * Controller's "init" lifecycle method.
     *
     * @public
     */
    onInit() {
      const oComponent = this.getOwnerComponent();
      const oRouter = oComponent.getRouter();
      oRouter
        .getRoute("ProductDetails")
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
      const sProductID = mRouteArguments.ProductID;
      const oODataModel = this.getView().getModel();

      oODataModel.metadataLoaded().then(() => {
        const sKey = "/Products(" + sProductID + ")";
        that.getView().bindObject({ path: sKey });
      });
    },
    /**
     * Close ProductDetail page.
     *
     * @param {sap.ui.base.Event} oEvent event object.
     *
     * @public
     *
     */
    onPressCloseProductDetailBtn(oEvent) {
      const oSource = oEvent.getSource();
      const oCtx = oSource.getBindingContext();

      const oComponent = this.getOwnerComponent();
      oComponent
        .getRouter()
        .navTo("StoreDetails", { StoreID: oCtx.getObject("StoreID") });
    },
  });
});
