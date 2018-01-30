import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftSchedulingComponent} from './shift-scheduling/shift-scheduling.component';
import {DxDataGridModule, DxTemplateHost, DxTemplateModule} from 'devextreme-angular';
import {ShiftService} from '../../services/shifts/shift.service';

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTemplateModule
  ],
  declarations: [
    ShiftSchedulingComponent
  ],
  providers: [ShiftService]
})
export class ShiftPlannerModule {
}
