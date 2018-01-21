import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginGuard} from "./utilities/guards/login-guard";
import {ShiftSchedulingComponent} from "./components/shift-scheduling/shift-scheduling.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch : 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'shiftlist', component: ShiftSchedulingComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
