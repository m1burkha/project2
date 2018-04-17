import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '@components/header/header.component';
import {RouterModule, Routes} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
