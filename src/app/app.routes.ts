import { Routes } from '@angular/router';
import { ConditionFormComponent } from './condition-form/condition-form.component';
import { OverviewComponent } from './overview/overview.component';

export const routes: Routes = [
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
    {path: 'overview', component: OverviewComponent},
    {path: 'condition-form', component: ConditionFormComponent},
];
