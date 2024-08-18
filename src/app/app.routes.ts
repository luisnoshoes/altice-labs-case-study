import { Routes } from '@angular/router';
import { ConditionFormComponent } from './condition-form/condition-form.component';
import { OverviewComponent } from './overview/overview.component';

export const routes: Routes = [
    {path: 'condition-form', component: ConditionFormComponent},
    {path: 'overview', component: OverviewComponent}
];
