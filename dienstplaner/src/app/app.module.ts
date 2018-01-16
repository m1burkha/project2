import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './components/app/app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {DevBarComponent} from './components/dev-bar/dev-bar.component';


@NgModule({
    declarations: [
        AppComponent,
        DevBarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
