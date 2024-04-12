sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("kate.vaitsiulevich.controller.App", {
    /**
     * Controller's "onInit" lifecycle method.
     *
     * @public
     */
    onInit() {
      const oComponent = this.getOwnerComponent();
      oComponent.getRouter().attachRouteMatched(this.onRouteMatched, this);
      oComponent
        .getRouter()
        .attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
    },
    /**
     * "App" route pattern before matched event handler.
     *
     * @param {sap.ui.base.Event} oEvent event object.
     *
     * @public
     *
     */
    onBeforeRouteMatched(oEvent) {
      const oModel = this.getOwnerComponent().getModel("AppLayout");
      let sLayout = oEvent.getParameters().arguments.layout;

      if (!sLayout) {
        const oCurrentUIState = this.getOwnerComponent()
          .getHelper()
          .getCurrentUIState();
        sLayout = oCurrentUIState.layout;
      } else {
        oModel.setProperty("/layout", sLayout);
      }
    },
    /**
     * "App" route pattern matched event handler.
     *
     * @param {sap.ui.base.Event} oEvent event object.
     *
     * @public
     *
     */
    onRouteMatched(oEvent) {
      const sRouteName = oEvent.getParameter("name"),
        oArguments = oEvent.getParameter("arguments");

      this._updateUIElements();
      this.currentRouteName = sRouteName;
      this.currentStore = oArguments.StoreID;
      this.currentProduct = oArguments.ProductID;
    },
    /**
     * Changed App State for FlexibleColumnLayout element.
     *
     * @param {sap.ui.base.Event} oEvent event object.
     *
     * @public
     *
     */
    onChangeAppState(oEvent) {
      const bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
        sLayout = oEvent.getParameter("layout");
      this._updateUIElements();

      if (bIsNavigationArrow) {
        const oComponent = this.getOwnerComponent();
        oComponent.getRouter().navTo(
          this.currentRouteName,
          {
            layout: sLayout,
            StoreID: this.currentStore,
            ProductID: this.currentProduct,
          },
          true
        );
      }
    },
    /**
     * Controller's "onExit" lifecycle method.
     *
     * @public
     *
     */
    onExit() {
      this.oRouter.detachRouteMatched(this.onRouteMatched, this);
      this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
    },
    /**
     * Update App Elements.
     *
     * @private
     *
     */
    _updateUIElements() {
      const oModel = this.getOwnerComponent().getModel("AppLayout");
      const oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();

      oModel.setData(oUIState, "AppLayout");
    },
  });
});
