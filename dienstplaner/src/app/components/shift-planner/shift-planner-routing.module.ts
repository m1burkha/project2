import {NgModule} from '@angular/core';
import {LoginGuard} from '@utilities/guards/login-guard';
import {RouterModule, Routes} from '@angular/router';
import {ShiftScheduleComponent} from '@components/shift-planner/shift-scheduling/shift-schedule.component';


const plannerRoutes: Routes = [
  {path: 'shiftlist', component: ShiftScheduleComponent, canActivate: [LoginGuard]},
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
