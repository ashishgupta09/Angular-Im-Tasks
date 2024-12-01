import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Employee } from '../../model/employee';
import { ApiService } from '../../service/api.service';
import * as xls from 'xlsx';

@Component({
  selector: 'app-print-data-into-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-data-into-excel.component.html',
  styleUrl: './print-data-into-excel.component.scss'
})
export class PrintDataIntoExcelComponent {
  @ViewChild('table') tableList!: ElementRef;
  employeeList: Employee[] = [];

  constructor(
    private apiService: ApiService
  ) {
    this.getEmployeList();
  }

  getEmployeList() {
    this.apiService.getData().subscribe({
      next: (res: Employee[]) => {
        this.employeeList = res;
      }
    })
  }

  convertIntoExcel() {
    const excelList = xls.utils.table_to_book(this.tableList.nativeElement);
    xls.writeFile(excelList, 'excel-list');
  }

}
