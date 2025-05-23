<script setup lang="ts">
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
  type DxDataGridTypes,
} from 'devextreme-vue/data-grid';
 
import { employees } from '../data';

const allowedPageSizes = [5, 10, 20];

const onContextMenuPreparing = (e: DxDataGridTypes.ContextMenuPreparingEvent): void => {
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
        onItemClick: async(): Promise<void> => {
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
};
</script>
<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="employees"
      key-expr="ID"
      @context-menu-preparing="onContextMenuPreparing"
    >
      <DxColumn data-field="FirstName" />
      <DxColumn data-field="LastName" />
      <DxColumn data-field="Title" />
      <DxColumn data-field="City" />
      <DxColumn data-field="Country" />

      <DxPaging :page-size="10" />
      <DxPager
        :visible="true"
        :allowed-page-sizes="allowedPageSizes"
        :show-page-size-selector="true"
      />
      <DxEditing
        mode="row"
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
      />
    </DxDataGrid>
  </div>
</template>
