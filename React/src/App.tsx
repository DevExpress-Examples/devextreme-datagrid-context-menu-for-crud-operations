import { useCallback } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DataGrid, {
  Column, Paging, Pager, Editing, type DataGridTypes,
} from 'devextreme-react/data-grid';
import { employees } from './data.tsx';

const allowedPageSizes = [5, 10, 20];

function App(): JSX.Element {
  const onContextMenuPreparing = useCallback((e: DataGridTypes.ContextMenuPreparingEvent): void => {
    if (e.row?.rowType === 'data') {
      const rowIndex = e.row.rowIndex;
      if (e.rowIndex === undefined) return;
      e.items = [
        {
          text: 'edit',
          onItemClick(): void {
            e.component.editRow(rowIndex);
          },
        },
        {
          text: 'insert',
          onItemClick: async (): Promise<void> => {
            await e.component.addRow();
          },
        },
        {
          text: 'delete',
          onItemClick(): void {
            e.component.deleteRow(rowIndex);
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
