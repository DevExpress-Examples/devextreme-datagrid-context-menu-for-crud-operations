import { Component } from "@angular/core";
import { Service } from "./app.service";
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-root',
  providers: [Service],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees: any;
  readonly allowedPageSizes = [5, 10, 20];

  onContextMenuPreparing(e: DxDataGridTypes.ContextMenuPreparingEvent){
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
  }

  constructor(service: Service) {
    this.employees = service.getEmployees();
  }
  
}
