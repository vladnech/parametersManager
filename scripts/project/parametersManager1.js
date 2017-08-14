parametersManager = function(options) {
    this.init();
};

parametersManager.prototype = {
    init: function() {
        this.parametersGrid = $("#parametersGrid");
        this.initGrid();
    },

    initGrid: function() {
        var self = this;
        this.parametersGrid.kendoGrid({
            dataSource: self.getGridSource(),
            navigatable: true,
            pageable: false,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                { field: "Discontinued", width: 120, editor: self.customBoolEditor }],
            editable: true
        });
    },

    customBoolEditor: function (container, options) {
        $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label">&#8203;</label>').appendTo(container);
    },

    getGridSource: function() {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
        dataSource = new kendo.data.DataSource({
            transport: {
                read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                },
                update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                },
                destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    dataType: "jsonp"
                },
                create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false, nullable: true },
                        ProductName: { validation: { required: true } },
                        UnitPrice: { type: "number", validation: { required: true, min: 1} },
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                }
            }
        });

        return dataSource;
    }
}; 