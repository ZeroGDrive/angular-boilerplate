import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './Presentation/login/login.component';
import { MainComponent } from './Presentation/main/main.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [LoginComponent, MainComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [LoginComponent, MainComponent],
  providers: [AuthService]
})
export class CoreModule { }
