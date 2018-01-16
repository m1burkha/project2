import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './components/app/app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {DevModule} from './components/dev/dev.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DevModule,
        AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
