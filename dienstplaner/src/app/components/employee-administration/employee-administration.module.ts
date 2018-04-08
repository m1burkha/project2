import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DxButtonModule, DxDataGridModule} from 'devextreme-angular';

import {EmployeeAdministrationComponent} from '@components/employee-administration/employee-administration.component';
import {HeaderModule} from '@components/header/header.module';

/**
 * routes for employee administration
 */
const routes: Routes = [
  {
    path: '',
    component: EmployeeAdministrationComponent
  }
];

/**
 * module for employee administration
 */
@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    DxDataGridModule,
    DxButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EmployeeAdministrationComponent
  ],
  exports: [RouterModule],
  providers: []
})
export class EmployeeAdministrationModule {
}
