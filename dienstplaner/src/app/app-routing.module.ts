import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {TestComponent} from './components/db/test/test.component';

import {ShiftSchedulingComponent} from '@components/shift-planner/shift-scheduling/shift-scheduling.component';
import {ShiftPlannerModule} from '@components/shift-planner/shift-planner.module';

const routes: Routes = [
<<<<<<< HEAD
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'shiftlist', component: ShiftSchedulingComponent, canActivate: [LoginGuard]},
    {path: 'employees', loadChildren: 'app/components/employee-administration/employee-administration.module#EmployeeAdministrationModule'},
    {path: 'db/test', component: TestComponent}
=======
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
//  {path: 'shiftlist', loadChildren: 'app/components/shift-planner/shift-planner.module#ShiftPlannerModule'},
  {path: 'db/test', component: TestComponent}

>>>>>>> development
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
