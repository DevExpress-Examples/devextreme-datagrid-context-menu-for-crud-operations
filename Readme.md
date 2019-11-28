<!-- default file list -->
*Files to look at*: [index.html](/JS/index.html)

<!-- default file list end -->
# DataGrid - How to implement a context menu for editing, adding and deleting rows
<!-- run online -->
**[[Run Online]](https://codecentral.devexpress.com/t123309/)**
<!-- run online end -->


This example demonstrates how to implement a context menu for editing, adding and deleting rows of dxDataGrid.
Use the [onContextMenuPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onContextMenuPreparing) event to create a custom menu. In the event handler, check if the current row is the data row. Then, add the corresponding items ("edit", "insert", "delete") to the e.items array. Handle the onItemClick event for each item. In the event handler, call the [editRow](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Methods/#editRowrowIndex), [insertRow](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Methods/#insertRow) or [removeRow](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Methods/#removeRowrowIndex) methods to edit the current row, add a new row or remove the current row.

<br/>


