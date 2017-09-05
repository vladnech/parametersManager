parametersManager = function(options) {
    this.init();
};

parametersManager.prototype = {
    init: function() {
        this.parametersGrid = $("#parametersGrid");
        this.grid = this.parametersGrid.customGrid({
            toolbar: { 
                buttons: [{ title: "Add parameter", id: "addRow", glyph: "glyphicon-plus", onclick: this.onAddParameterClick, context: this }, 
                          { title: "Add value", id: "addColumn", glyph: "glyphicon-plus", onclick: this.onAddValueClick, context: this }]
            }
        });
        //this.initToolbar();
        //this.initGrid();
    },

    initToolbar: function() {
        this.addParameter = $("#addParameter");
        this.addValue = $("#addValue");

        this.addParameter.off().on("click", { obj: this }, this.onAddParameterClick);
        this.addValue.off().on("click", { obj: this }, this.onAddValueClick);
    },

    onAddParameterClick: function(e) {
        var self = e.data.obj;
        self.addRow();
    },

    addRow: function() {
        var template = this.parametersGrid.find("tr:last").find("td");

        var tr = $("<tr>");
        $.each(template, function(index, item) {
            var td = $("<td>");
            td.html($(item).html());
            tr.append(td);
        });
        this.parametersGrid.find("table").append(tr);
        this._applyEvents();
    },

    addColumn: function() {
        var self = this;
        var template = this.parametersGrid.find("tr");
        $.each(template, function(index, item) {
            if ($(item).hasClass("c-grid-columns")) {
                var th = $("<th>");
                if (self && self.grid)
                    th.html(self.grid.defaultColumn.html);
                th.appendTo($(item));
            }
            else {
                var td = $("<td>");
                if (self && self.grid)
                    td.html(self.grid.defaultCell.html);
                $(item).append(td);
            }
        });
        this._applyEvents();
    },

    onAddValueClick: function(e) {
        var self = e.data.obj;
        self.addColumn();
    },

    onEnterValueClick: function(e) {
        var self = e.data.obj;
        var el = $(this);
        var tr = el.parent();
        el.hide();

        var text = null;
        if (el.hasClass("change-value"))
            text = el.text();

        var i = self.getTextBox(text);
        tr.append(i);
        i.focus();

        i.focusout(function() {
            var value = $(this).val();
            console.log(value);
            $(this).remove();

            if (value) {
                el.removeClass("enter-value").addClass("change-value");
                el.text(value);
            }
            el.show();
        });
    },

    getTextBox: function(value) {
        var input = $("<input>");
        input.attr("type", "text");
        input.addClass("c-grid-textbox");
        if (value)
            input.attr("value", value);
        return input;
    },

    initGrid: function() {
        this._applyEvents();
    },

    _applyEvents: function() {
        this.enterValue = $(".enter-value");
        this.enterValue.off().on("click", { obj: this }, this.onEnterValueClick);
    },
    
    getGridSource: function() {
        var dataSource = {};
        return dataSource;
    }
}; 