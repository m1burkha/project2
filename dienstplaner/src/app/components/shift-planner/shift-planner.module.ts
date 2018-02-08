import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DxButtonModule, DxCalendarModule, DxDataGridModule, DxDateBoxModule, DxLookupModule, DxPopupModule, DxSelectBoxModule, DxTemplateHost,
  DxTemplateModule, DxTextBoxModule
} from 'devextreme-angular';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftScheduleComponent} from '@components/shift-planner/shift-scheduling/shift-schedule.component';
import {DxoLabelModule} from 'devextreme-angular/ui/nested/label';
import {RouterModule, ROUTES, Routes} from '@angular/router';
import {LoginGuard} from '@utilities/guards/login-guard';
import { ShiftItemComponent } from './shift-item/shift-item.component';


const plannerRoutes: Routes = [
  {path: 'shiftlist', component: ShiftScheduleComponent, canActivate: [LoginGuard]},
];


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
    DxTextBoxModule,
    DxoLabelModule,
    DxLookupModule,
    [RouterModule.forChild(plannerRoutes)]
  ],
  declarations: [
    ShiftScheduleComponent,
    ShiftItemComponent
  ],
  providers: [ShiftScheduleService, LoginGuard]
})
export class ShiftPlannerModule {
}
