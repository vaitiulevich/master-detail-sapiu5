sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
  ],
  (Controller, MessageToast, MessageBox, MockServer, JSONModel, ODataModel) => {
    "use strict";

    return Controller.extend("kate.vaitsiulevich.controller.ProductDetails", {
      /**
       * Controller's "onInit" lifecycle method.
       *
       * @public
       */
      onInit() {
        this.oResourceBundle = this.getOwnerComponent()
          .getModel("i18n")
          .getResourceBundle();
        const oComponent = this.getOwnerComponent();
        const oRouter = oComponent.getRouter();
        oRouter
          .getRoute("StoreDetails")
          .attachPatternMatched(this.onPatternMatched, this);
        oRouter
          .getRoute("ProductDetails")
          .attachPatternMatched(this.onPatternMatched, this);

        // this._onConnectEditSmartForm()
      },
      /**
       * Set Full Screen Mode.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onToggleFullScreenBtn(oEvent) {
        const oODataModel = this.getView().getModel("AppLayout");
        const oComponent = this.getOwnerComponent();
        const oSource = oEvent.getSource();
        const oCtx = oSource.getBindingContext();

        const sStoreId = oCtx.getObject("StoreID");
        const sProductID = oCtx.getObject("ProductID");
        const sNextLayout = oODataModel.getProperty(
          "/actionButtonsInfo/endColumn/fullScreen"
        );

        oComponent.getRouter().navTo("ProductDetails", {
          layout: sNextLayout,
          StoreID: sStoreId,
          ProductID: sProductID,
        });
      },
      /**
       * Exit Full Screen Mode.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onToggleExitFullScreenBtn(oEvent) {
        const oODataModel = this.getView().getModel("AppLayout");
        const oComponent = this.getOwnerComponent();
        const oSource = oEvent.getSource();
        const oCtx = oSource.getBindingContext();

        const sStoreId = oCtx.getObject("StoreID");
        const sProductID = oCtx.getObject("ProductID");
        const sNextLayout = oODataModel.getProperty(
          "/actionButtonsInfo/endColumn/exitFullScreen"
        );

        oComponent.getRouter().navTo("ProductDetails", {
          layout: sNextLayout,
          StoreID: sStoreId,
          ProductID: sProductID,
        });
      },
      /**
       * "ProductDetails" route pattern matched event handler.
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
        const sStoreID = mRouteArguments.StoreID;
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
        const sStoreID = oCtx.getObject("StoreID");

        oComponent.getRouter().navTo("StoreDetails", {
          StoreID: sStoreID,
          layout: "TwoColumnsMidExpanded",
        });
      },
      /**
       * Delete product.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onPressDeleteProductBtn(oEvent) {
        MessageBox.show(
          this.oResourceBundle.getText("DeleteProductConfirmContent"),
          {
            icon: MessageBox.Icon.QUESTION,
            title: this.oResourceBundle.getText("DeleteProductConfirmTitle"),
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            emphasizedAction: MessageBox.Action.YES,
            onClose: (sAction) => {
              if (sAction !== MessageBox.Action.OK) {
                return;
              }
              const oCtx = oEvent.getSource().getBindingContext();
              this._onRemoveProduct(oCtx);
            },
          }
        );
      },
      /**
       * Remove Store event.
       *
       * @private
       *
       * @param {object} oCtx context of store.
       *
       */
      _onRemoveProduct(oCtx) {
        const oODataModel = oCtx.getModel();
        const sKey = oODataModel.createKey("/Products", oCtx.getObject());
        const sStoreID = oCtx.getObject("StoreID");

        oODataModel.remove(sKey, {
          success: () => {
            MessageToast.show(
              this.oResourceBundle.getText("MessageDeleteProductSuccess")
            );
            const oComponent = this.getOwnerComponent();
            oComponent.getRouter().navTo("StoreDetails", {
              StoreID: sStoreID,
              layout: "TwoColumnsMidExpanded",
            });
          },
          error: () => {
            MessageToast.error(
              this.oResourceBundle.getText("MessageDeleteProductError")
            );
          },
        });
      },
      /**
       * Function to activate input validation.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      handleEditToggled(oEvent) {},
    });
  }
);
