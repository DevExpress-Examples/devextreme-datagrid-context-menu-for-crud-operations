<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/128583131/19.2.11%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T123309)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
<!-- default file list -->
*Files to look at*: [index.html](/JS/index.html)

<!-- default file list end -->
# DataGrid - How to implement a context menu for editing, adding and deleting rows
<!-- run online -->
**[[Run Online]](https://codecentral.devexpress.com/t123309/)**
<!-- run online end -->


This example demonstrates how to implement a context menu for editing, adding and deleting rows of dxDataGrid.

Use the [onContextMenuPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onContextMenuPreparing) event to create a custom menu.

In the event handler, check if the current row is the data row. Then, add the corresponding items ("edit", "insert", "delete") to the **e.items** array. Handle the [onItemClick](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxContextMenu/Configuration/#onItemClick) event for each item. 

In the event handler, call the [editRow](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Methods/#editRowrowIndex), [addRow](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Methods/#addRow) or [deleteRow](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Methods/#deleteRowrowIndex) methods to edit the current row, add a new row or remove the current row.


