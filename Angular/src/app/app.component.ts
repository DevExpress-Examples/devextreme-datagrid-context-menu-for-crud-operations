import { Component, ChangeDetectionStrategy } from '@angular/core';
import {DxDataGridTypes, DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import { Service } from './app.service';

@Component({
  selector: 'app-root',
  imports: [DxDataGridModule],
  providers: [Service],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  employees: any;

  readonly allowedPageSizes = [5, 10, 20];

  constructor(service: Service) {
    this.employees = service.getEmployees();
  }

  onContextMenuPreparing(e: DxDataGridTypes.ContextMenuPreparingEvent): void {
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
  }
}
