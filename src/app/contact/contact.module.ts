import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ContactService } from './../shared/services/contact.service';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
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
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AdvancedSearchContactComponent } from './advanced-search-contact/advanced-search-contact.component';

@NgModule({
  imports: [
    ContactRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule, DateInputsModule
  ],
  declarations: [ 
    ContactComponent, ContactDetailComponent, CreateContactComponent, EditContactComponent, AdvancedSearchContactComponent, 
  ],
  providers:[ ContactService, HttpClient, AuthGuard, LoginService, PgService]
})
export class ContactModule { }