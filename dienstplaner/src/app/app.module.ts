import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './components/app/app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {DevModule} from './components/dev/dev.module';
import {LoginComponent} from './components/login/login.component';
import {fakeBackendProvider} from './services/fake-backend/fake-backend.service';
import {AuthenticationService} from './services/authentication/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {TestComponent} from './components/db/test/test.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {UserService} from './services/user/user.service';
import {ShiftSchedulingService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftPlannerModule} from '@components/shift-planner/shift-planner.module';
import {ShiftPlannerRoutingModule} from '@components/shift-planner/shift-planner-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    DevModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ShiftPlannerModule,
    ShiftPlannerRoutingModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    fakeBackendProvider,
    UserService,
    ShiftSchedulingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
