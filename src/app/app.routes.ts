import { Routes } from '@angular/router';
import { JsonCrudComponent } from './json-crud/json-crud.component';
import { CrudComponent } from './crud/crud.component';

export const routes: Routes = [
	{ path: 'crud', component: CrudComponent },
	{ path: 'json-crud', component: JsonCrudComponent }
];
