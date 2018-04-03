import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ClickDummyComponent} from './click-dummy/click-dummy.component';
import {LoginGuard} from '@utilities/guards/login-guard';
import {TemplatesComponent} from './click-dummy/templates/templates.component';
import {ShiftlistComponent} from './click-dummy/shiftlist/shiftlist.component';
import {MatFormFieldModule, MatSelectModule, MatTableModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import { ServerCommComponent } from './click-dummy/server-comm/server-comm.component';


const routes: Routes = [
  {path: '', component: ClickDummyComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  declarations: [ClickDummyComponent, TemplatesComponent, ShiftlistComponent, ServerCommComponent],
  providers: [LoginGuard]
})
export class ClickDummyModule {
}
