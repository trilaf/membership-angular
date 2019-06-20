import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UpdateComponent } from './user/update/update.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "auth", component: UserProfileComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "user", component: UserComponent, children: [
    {path: "detail", component: ProfileComponent},
    {path: "list", component: UsersListComponent},
    {path: "update", component: UpdateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
