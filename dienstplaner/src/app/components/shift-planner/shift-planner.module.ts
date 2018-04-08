import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxLookupModule,
  DxPivotGridModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTabPanelModule,
  DxTabsModule,
  DxTemplateModule,
  DxTextBoxModule
} from 'devextreme-angular';
import {LoginGuard} from '@utilities/guards/login-guard';
import {RouterModule, Routes} from '@angular/router';
import {ShiftScheduleComponent} from '@components/shift-planner/shift-scheduling/shift-schedule.component';
import {ShiftItemComponent} from '@components/shift-planner/shift-item/shift-item.component';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftTemplateComponent} from '@components/shift-planner/shift-template/shift-template.component';
import {ShiftTimeSpanComponent} from '@components/shift-planner/shift-time-span/shift-time-span.component';

import {DevModule} from '@components/dev/dev.module';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {ShiftItemsService} from '@services/shift-items/shift-items.service';
import {AddDialogComponent} from './shift-template/add-dialog/add-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderModule} from '@components/header/header.module';

const plannerRoutes: Routes = [
  {path: '', component: ShiftScheduleComponent, canActivate: [LoginGuard]},
  {path: 'templates', component: ShiftTemplateComponent, canActivate: [LoginGuard]},
  {path: 'shifttemplate', component: ShiftTemplateComponent},
];

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    DxDataGridModule,
    DxPivotGridModule,
    DxTemplateModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxLookupModule,
    DxTabsModule,
    DxTabPanelModule,
    DevModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
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
  providers: [ShiftScheduleService, ShiftItemsService, LoginGuard],
  exports: [RouterModule],
})
export class ShiftPlannerModule {
}
