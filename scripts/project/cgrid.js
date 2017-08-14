//********************************************************************************
// Custom Grid widget (CGrid)
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

cgrid = function(options) {
    $.extend(this, options);
    this.init();
};

cgrid.prototype = {
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
            if (item.onclick)
                a.off().on("click", item.onclick);
            self.DOM.toolbar.append(a);
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

    initTable: function() {
        this.addTitleRow();
        if (this.data) {
        }
        else {
            var tr = $("<tr>");
            if (this.defaultFirstColumnRow) {
                
            }

        }
    }
};

$.fn.cgrid = function(options) {
    var defaultColumn = { html: "<span class='enter-value'>[Change title]</span>" };
    var defaultFirstColumnRow = { html: "<span class='enter-value'>[Change name]</span>" };
    var defaultCell = { html: "<span class='enter-value'>[Enter value]</span>" };

    var defaults = {
        toolbar: { 
            buttons: [{ title: "Add row", id: "addRow", glyph: "glyphicon-plus" }, 
                      { title: "Add column", id: "addColumn", glyph: "glyphicon-plus" }]
        },
        defaultColumn: defaultColumn,
        defaultFirstColumnRow: defaultFirstColumnRow,
        defaultCell: defaultCell,
        columns: [{ title: "Column/Row" }, defaultColumn] }
    };

    options = $.extend(true, {}, defaults, options);
    this.each(function() {
        options._element = this;
        return new cgrid(options);
    });
};