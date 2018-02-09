import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CallContactDetailComponent } from './../call-contact/call-contact-detail/call-contact-detail.component';
import { CallContactRoutingModule } from './call-contact-routing.module';
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
import { CallContactComponent } from 'app/call-contact/call-contact.component';
import { CallContactService } from 'app/shared/services/call-contact.service';
import { CreateCallContactComponent } from './create-call-contact/create-call-contact.component';
import { EditCallContactComponent } from './edit-call-contact/edit-call-contact.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [
    CallContactRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    CallContactComponent, 
    CallContactDetailComponent, CreateCallContactComponent, EditCallContactComponent
  ],
  providers:[CallContactService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class CallContactModule { }