import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DxButtonModule, DxDataGridModule, DxLookupModule, DxPopupModule, DxSelectBoxModule, DxTemplateHost, DxTemplateModule,
  DxTextBoxModule
} from 'devextreme-angular';
import {LoginGuard} from '@utilities/guards/login-guard';
import {RouterModule, Routes} from '@angular/router';
import {ShiftScheduleComponent} from '@components/shift-planner/shift-scheduling/shift-schedule.component';
import {ShiftItemComponent} from '@components/shift-planner/shift-item/shift-item.component';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';

const plannerRoutes: Routes = [
  {path: '', component: ShiftScheduleComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxLookupModule,
    RouterModule.forChild(plannerRoutes)
  ],
  declarations: [
    ShiftScheduleComponent,
    ShiftItemComponent
  ],
  providers: [ShiftScheduleService, LoginGuard]
})
export class ShiftPlannerModule {
}
