import {NgModule} from '@angular/core';
import {LoginGuard} from '@utilities/guards/login-guard';
import {RouterModule, Routes} from '@angular/router';
import {ShiftSchedulingComponent} from '@components/shift-planner/shift-scheduling/shift-scheduling.component';


const plannerRoutes: Routes = [
  {path: 'shiftlist', component: ShiftSchedulingComponent, canActivate: [LoginGuard]},
];


@NgModule({
  imports: [
    RouterModule.forChild(plannerRoutes)
  ],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class ShiftPlannerRoutingModule {
}
