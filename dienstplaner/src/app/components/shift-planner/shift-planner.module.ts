import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DxButtonModule, DxCalendarModule, DxDataGridModule, DxDateBoxModule, DxPopupModule, DxSelectBoxModule, DxTemplateHost,
  DxTemplateModule
} from 'devextreme-angular';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftScheduleComponent} from '@components/shift-planner/shift-scheduling/shift-schedule.component';
import {ShiftPlannerRoutingModule} from '@components/shift-planner/shift-planner-routing.module';


@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSelectBoxModule,
    DxCalendarModule,
    DxDateBoxModule,
    DxButtonModule,
    DxPopupModule,
    ShiftPlannerRoutingModule
  ],
  declarations: [
    ShiftScheduleComponent
  ],
  providers: [ShiftScheduleService]
})
export class ShiftPlannerModule {
}
