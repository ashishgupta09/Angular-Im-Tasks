import { Routes } from '@angular/router';
import { JsonCrudComponent } from './pages/json-crud/json-crud.component';
import { CrudComponent } from './pages/crud/crud.component';
import { DragDropComponent } from './pages/drag-drop/drag-drop.component';
import { PrintDataIntoExcelComponent } from './pages/print-data-into-excel/print-data-into-excel.component';
import { ParentComponent } from './pages/parent/parent.component';
import { FormValidationComponent } from './pages/form-validation/form-validation.component';
import { ChartComponent } from './pages/chart/chart.component';
import { OtpFieldComponent } from './pages/otp-field/otp-field.component';

export const routes: Routes = [
	{ path: '', component: FormValidationComponent },
	{ path: 'crud', component: CrudComponent },
	{ path: 'json-crud', component: JsonCrudComponent },
	{ path: 'drag-drop', component: DragDropComponent },
	{ path: 'excel-data', component: PrintDataIntoExcelComponent },
	{ path: 'parent', component: ParentComponent },
	{ path: 'chart', component: ChartComponent },
	{ path: 'otp', component: OtpFieldComponent },

];
