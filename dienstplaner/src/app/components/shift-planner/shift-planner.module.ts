import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftSchedulingComponent} from './shift-scheduling/shift-scheduling.component';
import {DxDataGridModule, DxTemplateHost, DxTemplateModule} from 'devextreme-angular';
import {ShiftService} from '../../services/shifts/shift.service';
import {LoginGuard} from "@utilities/guards/login-guard";
import {RouterModule, Routes} from "@angular/router";

const plannerRoutes: Routes = [
  {path: '', component: ShiftSchedulingComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    RouterModule.forChild(plannerRoutes)
  ],
  declarations: [
    ShiftSchedulingComponent
  ],
  providers: [ShiftService, LoginGuard]
})
export class ShiftPlannerModule {
}
