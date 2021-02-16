$(function () {

    var employees = [{
        "ID": 1,
        "FirstName": "John",
        "LastName": "Heart",
        "City": "Los Angeles"
    }, {
        "ID": 2,
        "FirstName": "Olivia",
        "LastName": "Peyton",
        "City": "Los Angeles"
    }, {
        "ID": 3,
        "FirstName": "Robert",
        "LastName": "Reagan",
        "City": "Bentonville"
    }, {
        "ID": 4,
        "FirstName": "Greta",
        "LastName": "Sims",
        "City": "Boise"
    }, {
        "ID": 5,
        "FirstName": "Brett",
        "LastName": "Wade",
        "City": "Atlanta"
    }];

    $("#gridContainer").dxDataGrid({
        dataSource: employees,
        columns: ['FirstName', 'LastName', 'Title', 'City', 'Country'],
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20]
        },
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        onContextMenuPreparing: function (e) {
            if (e.row.rowType === "data") {
                e.items = [{
                    text: "edit",
                    onItemClick: function () {
                        e.component.editRow(e.row.rowIndex);
                    }
                },
                {
                    text: "insert",
                    onItemClick: function () {
                        e.component.addRow();
                    }
                },
                {
                    text: "delete",
                    onItemClick: function () {
                        e.component.deleteRow(e.row.rowIndex);
                    }
                }];
            }
        }
    });
});