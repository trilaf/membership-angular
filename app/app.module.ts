import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './core/auth.service';
import { UpdateComponent } from './user/update/update.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    ProfileComponent,
    UsersListComponent,
    RegisterComponent,
    UpdateComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
