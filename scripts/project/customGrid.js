//********************************************************************************
// Custom Grid widget (customGrid)
// options: {
//             _element: <reference to a DOM element>    
//             toolbar: { 
//                         cssClass: <name> (default: "c-grid-toolbar")     
//                         buttons: [{ title: "", id: "", onclick: <function> }] 
//                      }
//             columns: [{ title: "", field: "" }],
//             dataSource: {}
//          }
//********************************************************************************

customGrid = function(options) {
    $.extend(this, options);
    this.init();
};

customGrid.prototype = {
    init: function() {
        if (this._element) {
            this.DOM = {};
            this.initDOM();
        }
    },

    initDOM: function() {
        if (this.toolbar) {
            this.DOM.toolbar = $("<div>");
            this.initToolbar();
        }

        this.DOM.table = $("<table>");
        this.DOM.table.addClass("c-grid");
        this.initTable();
    },

    initToolbar: function() {
        var self = this;

        this.DOM.toolbar.addClass("c-grid-toolbar");
        if (this.toolbar.cssClass)
            this.DOM.toolbar.addClass(this.toolbar.cssClass);

        $.each(this.toolbar.buttons, function(i, item) {
            var a = $("<a>");
            if (item.id) a.attr("id", item.id);
            a.attr("href", "javascript:void(0)");
            if (item.glyph) {
                var span = $("<span>");
                span.addClass("glyphicon")
                    .addClass(item.glyph);
                span.appendTo(a);
            }
            a.html(a.html() + " " + item.title);
            self.DOM.toolbar.append(a);
            if (item.onclick) 
                a.off().on("click", { obj: item.context || self }, item.onclick);
        });

        this.DOM.toolbar.appendTo(this._element);
    },

    addTitleRow: function() {
        var tr = $("<tr>");
        tr.addClass("c-grid-columns");
        $.each(this.columns, function(i, item) {
            var th = $("<th>");
            if (item.html)
                th.html(item.html);
            else if (item.title)
                th.html(item.title);
            th.appendTo(tr);
        });
        tr.appendTo(this.DOM.table);
    },

    addCell: function(tr, html) {
        if (tr) {
            var td = $("<td>");
            if (html) td.html(html);
            td.appendTo(tr);
        }
    },

    initTable: function() {
        this.addTitleRow();
        if (this.data) {
        }
        else {
            var tr = $("<tr>");
            if (this.defaultFirstColumnRow) {
                this.addCell(tr, this.defaultFirstColumnRow.html);
            }
            if (this.defaultCell) {
                this.addCell(tr, this.defaultCell.html);
            }
            tr.appendTo(this.DOM.table);
        }
        this.DOM.table.appendTo(this._element);
        this._afterInitTable();
    },

    getTextBox: function(value) {
        var input = $("<input>");
        input.attr("type", "text");
        input.addClass("c-grid-textbox");
        if (value)
            input.attr("value", value);
        return input;
    },

    _afterInitTable: function() {
        if (this.afterInitTable) {
            return this.afterInitTable(this);
        }
        return this._defaultInitTable();
    },

    _defaultInitTable: function() {
        this.enterValue = $(".enter-value");
        this.enterValue.off().on("click", { obj: this }, this._onEnterValueClick);
        return true;
    },

    _onEnterValueClick: function(e) {
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
    }
};

$.fn.customGrid = function(options) {
    var defaultColumn = { html: "<span class='enter-value'>[Change title]</span>" };
    var defaultFirstColumnRow = { html: "<span class='enter-value'>[Change name]</span>" };
    var defaultCell = { html: "<span class='enter-value'>[Enter value]</span>" };

    var defaults = {
        toolbar: { 
            buttons: [{ title: "Add row", id: "addRow", glyph: "glyphicon-plus" }, 
                      { title: "Add column", id: "addColumn", glyph: "glyphicon-plus" }]
        },
        defaultFirstColumnRow: defaultFirstColumnRow,
        defaultCell: defaultCell,
        defaultColumn: defaultColumn,
        columns: [{ title: "Column/Row" }, defaultColumn] 
    };

    options = $.extend(true, {}, defaults, options);
    options._element = this;
    return new customGrid(options);
};