import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DxDataGridModule, DxButtonModule} from 'devextreme-angular';

import {EmployeeAdministrationComponent} from '@components/employee-administration/employee-administration.component';

/**
 * routes for employee administration
 */
const routes: Routes = [
    {
        path: 'employees',
        component: EmployeeAdministrationComponent
    }
];

/**
 * module for employee administration
 */
@NgModule({
    imports: [
        CommonModule,
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
