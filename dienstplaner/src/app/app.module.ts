import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './components/app/app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {DevModule} from './components/dev/dev.module';
import {LoginComponent} from './components/login/login.component';
import {ShiftSchedulingComponent} from './components/shift-scheduling/shift-scheduling.component';
import {fakeBackendProvider} from "./services/fake-backend/fake-backend.service";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShiftSchedulingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DevModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AuthenticationService,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
