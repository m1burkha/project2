import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@components/login/login.component';
import {TestComponent} from '@components/db/test/test.component';
import {LogoutComponent} from '@components/logout/logout.component';
import {PresentationComponent} from '@components/presentation/presentation.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'shiftlist', loadChildren: 'app/components/shift-planner/shift-planner.module#ShiftPlannerModule'},
  {path: 'employees', loadChildren: 'app/components/employee-administration/employee-administration.module#EmployeeAdministrationModule'},
  {path: 'presentation', component: PresentationComponent},
  {path: 'dev/click-dummy', loadChildren: 'app/components/dev/click-dummy/click-dummy.module#ClickDummyModule'},
  {path: 'db/test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
