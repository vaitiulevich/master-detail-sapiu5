sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "../model/formatter",
  ],
  (
    Controller,
    Sorter,
    Filter,
    FilterOperator,
    MessageToast,
    MessageBox,
    formatter
  ) => {
    "use strict";

    return Controller.extend("kate.vaitsiulevich.controller.StoreDetails", {
      formatter: formatter,
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
          .getRoute("StoreDetails")
          .attachPatternMatched(this.onPatternMatched, this);
        oRouter
          .getRoute("ProductDetails")
          .attachPatternMatched(this.onPatternMatched, this);
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
        const sNextLayout = oODataModel.getProperty(
          "/actionButtonsInfo/midColumn/fullScreen"
        );

        oComponent.getRouter().navTo("StoreDetails", {
          layout: sNextLayout,
          StoreID: sStoreId,
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
        const sNextLayout = oODataModel.getProperty(
          "/actionButtonsInfo/midColumn/exitFullScreen"
        );

        oComponent.getRouter().navTo("StoreDetails", {
          layout: sNextLayout,
          StoreID: sStoreId,
        });
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
          that.getView().bindObject({ path: sKey });
        });
      },
      /**
       * Open selection store page event handler.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onPressSellectionProductBtn(oEvent) {
        const sStoreId = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("StoreID");
        const sProductID = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("ProductID");

        const oComponent = this.getOwnerComponent();

        oComponent.getRouter().navTo("ProductDetails", {
          StoreID: sStoreId,
          ProductID: sProductID,
          layout: "ThreeColumnsMidExpanded",
        });
      },
      /**
       * Close Store Detail page.
       *
       * @public
       *
       */
      onPressClosePageBtn() {
        const oComponent = this.getOwnerComponent();
        oComponent.getRouter().navTo("StoresOverview", { layout: "OneColumn" });
      },
      /**
       * Sort product table by price.
       *
       * @public
       *
       */
      onPressSortPriceTableBtn() {
        this._bDescendingSort = !this._bDescendingSort;
        const oView = this.getView(),
          oTable = oView.byId("productsTable"),
          oBinding = oTable.getBinding("items"),
          oSorter = new Sorter("Price", this._bDescendingSort);
        oBinding.sort(oSorter);
      },
      /**
       * Searching product.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onSearchProduct(oEvent) {
        let oTableSearchState = [],
          sQuery = oEvent.getParameter("query");

        if (sQuery && sQuery.length > 0) {
          oTableSearchState = [
            new Filter("ProductName", FilterOperator.Contains, sQuery),
          ];
        }

        this.getView()
          .byId("productsTable")
          .getBinding("items")
          .filter(oTableSearchState, "Application");
      },
      /**
       * Delete store.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onPressDeleteStoreBtn(oEvent) {
        MessageBox.show(
          this.oResourceBundle.getText("DeleteStoreConfirmContent"),
          {
            icon: MessageBox.Icon.QUESTION,
            title: this.oResourceBundle.getText("DeleteStoreConfirmTitle"),
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            emphasizedAction: MessageBox.Action.YES,
            onClose: (sAction) => {
              if (sAction !== MessageBox.Action.OK) {
                return;
              }
              const oCtx = oEvent.getSource().getBindingContext();
              this._onRemoveStore(oCtx);
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
      _onRemoveStore(oCtx) {
        const oODataModel = oCtx.getModel();
        const sKey = oODataModel.createKey("/Stores", oCtx.getObject());

        oODataModel.remove(sKey, {
          success: () => {
            MessageToast.show(
              this.oResourceBundle.getText("MessageDeleteStoreSuccess")
            );
            this.onPressClosePageBtn();
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
