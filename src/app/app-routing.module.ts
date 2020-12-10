import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


import {Role} from './_models/role';
import {AuthGuard} from './_guards/auth.guard';
import {AdminComponent} from './admin/admin.component';

import {artistPageComponent} from './artistpage/artistpage.component';
import {PicturePageComponent} from './picturePage/picturePage.component';
import {RegisterArtComponent} from './registerArt/registerArt.component';
import { EditArtComponent } from './editArt/editArt.component';

//TODO: do not forget to register the components here.

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]}, {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'registerArt', component: RegisterArtComponent },
  { path: 'editArt', component: EditArtComponent },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.creator] so only admin users can access it.
    data: { roles: [Role.creator] }
  },

 
  
  {
    path: 'artistpage',
    component: artistPageComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.creator, Role.user] }
  },
  {
    path: 'getPicture',
    component: PicturePageComponent,
  
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
   
  },
  {
    path: 'art',
    component: PicturePageComponent,
    canActivate: [AuthGuard],
    // The prof route also sets the roles data property to [Role.Admin] so only admin users can access it.
    data: { roles: [Role.creator] }
  },

  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
