import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTableModule,GrowlModule, GalleriaModule, CalendarModule, 
       InputTextModule, DropdownModule, DataGridModule ,DataListModule, InputMaskModule, 
       SharedModule, DialogModule, ButtonModule, PanelModule, SliderModule, SpinnerModule, 
       ContextMenuModule, MenuItem, CheckboxModule, FileUploadModule,
       TabViewModule} from "../../node_modules/primeng/primeng";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingComponent} from './components/landing/landing.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';



const appRoutes: Routes =  [
  
  {path:'', component: LandingComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    LandingComponent
    

  ],
 

  imports: [
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    DataTableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    PanelModule,
    SliderModule,
    SharedModule,
    DataListModule,
    SpinnerModule,
    ContextMenuModule,
    DropdownModule,
    InputMaskModule,
    GalleriaModule,
    GrowlModule,
    DataGridModule,
    FileUploadModule,
    BrowserAnimationsModule,
    CalendarModule,
    CheckboxModule,
    TabViewModule
  ],
  providers: 
  [ValidateService, 
  AuthService, 
  AuthGuard],
  bootstrap: [AppComponent, ],
})
export class AppModule { }
