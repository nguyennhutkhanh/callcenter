import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ContactUserDetailComponent } from './../contact-user/contact-user-detail/contact-user-detail.component';
import { ContactUserRoutingModule } from './contact-user-routing.module';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ContactUserComponent } from 'app/contact-user/contact-user.component';
import { ContactUserService } from 'app/shared/services/contact-user.service';
import { CreateContactUserComponent } from './create-contact-user/create-contact-user.component';
import { EditContactUserComponent } from './edit-contact-user/edit-contact-user.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [
    ContactUserRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    ContactUserComponent, 
    ContactUserDetailComponent, CreateContactUserComponent, EditContactUserComponent
  ],
  providers:[ContactUserService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class ContactUserModule { }