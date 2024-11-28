import { Routes } from '@angular/router';
import { JsonCrudComponent } from './json-crud/json-crud.component';
import { CrudComponent } from './crud/crud.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';

export const routes: Routes = [
	{ path: '', component: FormValidationComponent },
	{ path: 'crud', component: CrudComponent },
	{ path: 'json-crud', component: JsonCrudComponent },
	{ path: 'drag-drop', component: DragDropComponent },
];
