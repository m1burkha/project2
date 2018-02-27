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
import {ShiftTemplateComponent} from './shift-template/shift-template.component';
import {ShiftTimeSpanComponent} from './shift-time-span/shift-time-span.component';
import {
  MatButton, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {ShiftItemsService} from '@services/shift-items/shift-items.service';
import {AddDialogComponent} from './shift-template/add-dialog/add-dialog.component';
import {RegisterDialogComponent} from "@components/register-dialog/register-dialog.component";
import {ReactiveFormsModule} from "@angular/forms";

const plannerRoutes: Routes = [
  {path: '', component: ShiftScheduleComponent, canActivate: [LoginGuard]},
  {path: 'templates', component: ShiftTemplateComponent, canActivate: [LoginGuard]},
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
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(plannerRoutes)
  ],
  declarations: [
    ShiftScheduleComponent,
    ShiftItemComponent,
    ShiftTemplateComponent,
    ShiftTimeSpanComponent,
    AddDialogComponent
  ],
  entryComponents: [AddDialogComponent],
  providers: [ShiftScheduleService, ShiftItemsService, LoginGuard]
})
export class ShiftPlannerModule {
}
