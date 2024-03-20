sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox"],
  (Controller, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("kate.vaitsiulevich.controller.ProductDetails", {
      /**
       * Controller's "init" lifecycle method.
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
      onPressDeleteProductBtn(oEvent) {
        MessageBox.show(
          this.oResourceBundle.getText("DeleteStoreConfirmContent"),
          {
            icon: MessageBox.Icon.QUESTION,
            title: this.oResourceBundle.getText("DeleteStoreConfirmTitle"),
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            emphasizedAction: MessageBox.Action.YES,
            onClose: (sAction) => {
              console.log(sAction);
              console.log(MessageBox.Action.YES);
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
        console.log(oCtx.getObject());

        oODataModel.remove(sKey, {
          success: () => {
            MessageToast.show(
              this.oResourceBundle.getText("MessageDeleteStoreSuccess")
            );
            // this.onOpenStoresOverviewPage();
          },
          error: () => {
            MessageToast.error(
              this.oResourceBundle.getText("MessageDeleteStoreError")
            );
          },
        });
      },
    });
  }
);
