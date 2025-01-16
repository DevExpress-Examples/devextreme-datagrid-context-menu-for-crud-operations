import { Component } from "@angular/core";
import { Service } from "./app.service";

import validationEngine from "devextreme/ui/validation_engine";

@Component({
  selector: 'app-root',
  providers: [Service],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees: any;
  readonly allowedPageSizes = [5, 10, 20];

  onContextMenuPreparing(e: any){
    if (e.row.rowType === "data") {
      e.items = 
        [
          {
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
          }
        ];
    }
  }

  constructor(service: Service) {
    this.employees = service.getEmployees();
    console.log(this.employees);
  }
  
}