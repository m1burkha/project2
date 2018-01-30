import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginGuard} from './utilities/guards/login-guard';
import {ShiftSchedulingComponent} from './components/shift-scheduling/shift-scheduling.component';
import {LoginComponent} from './components/login/login.component';
import {TestComponent} from './components/db/test/test.component';
import {EmployeeAdministrationComponent} from '@components/employee-administration/employee-administration.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'shiftlist', component: ShiftSchedulingComponent, canActivate: [LoginGuard]},
    {path: 'employees', component: EmployeeAdministrationComponent},
    {path: 'db/test', component: TestComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [LoginGuard]
})
export class AppRoutingModule {
}
