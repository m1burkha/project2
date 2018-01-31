import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DevRoutingModule} from './dev-routing.module';
import {DevBarComponent} from './dev-bar/dev-bar.component';

/**
 * module for dev components
 */
@NgModule({
    imports: [
        CommonModule,
        DevRoutingModule
    ],
    declarations: [
        DevBarComponent
    ],
    exports: [
        DevBarComponent
    ]
})
export class DevModule {
}
