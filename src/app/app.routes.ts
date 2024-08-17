import { Routes } from '@angular/router';
import { ConditionFormComponent } from './condition-form/condition-form.component';
import { ConditionListComponent } from './condition-list/condition-list.component';

export const routes: Routes = [
    {path: 'condition-form', component: ConditionFormComponent},
    {path: 'condition-list', component: ConditionListComponent}
];
