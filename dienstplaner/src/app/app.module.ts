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
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftPlannerModule} from '@components/shift-planner/shift-planner.module';
import {UserAdministrationComponent} from './components/user-administration/user-administration.component';
import {EmployeeService} from '@services/employee/employee.service';
import {EmployeeAdministrationModule} from '@components/employee-administration/employee-administration.module';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatSnackBarModule, MatTableModule, MatTabsModule
} from "@angular/material";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LogoutComponent} from "@components/logout/logout.component";
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import {ClickDummyModule} from "@components/dev/click-dummy/click-dummy.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    TestComponent,
    UserAdministrationComponent,
    RegisterDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DevModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ClickDummyModule,
    EmployeeAdministrationModule,
    ShiftPlannerModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule,
    NoopAnimationsModule,
  ],
  providers: [
    AuthenticationService,
    fakeBackendProvider,
    UserService,
    ShiftSchedulingService,
    EmployeeService
  ],
  entryComponents: [RegisterDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
