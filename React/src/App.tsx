import React, { useCallback } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DataGrid, {
  Column, Paging, Pager, Editing,
} from 'devextreme-react/data-grid';
import { employees } from './data';

const allowedPageSizes = [5, 10, 20];

function App(): JSX.Element {
  const onContextMenuPreparing = useCallback((e: any): void => {
    if (e.row.rowType === 'data') {
      e.items = [
        {
          text: 'edit',
          onItemClick(): void {
            e.component.editRow(e.row.rowIndex);
          },
        },
        {
          text: 'insert',
          onItemClick(): void {
            e.component.addRow();
          },
        },
        {
          text: 'delete',
          onItemClick(): void {
            e.component.deleteRow(e.row.rowIndex);
          },
        },
      ];
    }
  }, []);
  return (
    <div>
      <DataGrid
        id="gridContainer"
        dataSource={employees}
        keyExpr="ID"
        onContextMenuPreparing={onContextMenuPreparing}
      >
        <Column dataField="FirstName" />
        <Column dataField="LastName" />
        <Column dataField="Title" />
        <Column dataField="City" />
        <Column dataField="Country" />

        <Paging pageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          showPageSizeSelector={true} />

        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true} />
      </DataGrid>
    </div>
  );
}

export default App;
