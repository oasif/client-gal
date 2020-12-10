import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ArtComponent } from './art/art.component';
import {MaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { RegisterComponent } from './register/register.component';
import { RegisterArtComponent } from './registerArt/registerArt.component';

import { AdminComponent } from './admin/admin.component';

import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';

import { artistPageComponent } from './artistpage/artistpage.component';
import { PicturePageComponent } from './picturePage/picturePage.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {SimpleService } from './_services/simpleService.service';
import { EditArtComponent } from './editArt/editArt.component';

// the following are required for the image upload button
// ref: https://www.djamware.com/post/5f0533338ce55338fd15aca3/mean-stack-angular-10-tutorial-upload-image-file
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArtComponent,
    RegisterComponent,
    RegisterArtComponent,
    EditArtComponent,
    AdminComponent,
    
    artistPageComponent,
    PicturePageComponent

  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        NgxMaterialTimepickerModule,

        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MaterialFileInputModule
    ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      SimpleService
    ],
     
  bootstrap: [AppComponent]
})
export class AppModule { }
