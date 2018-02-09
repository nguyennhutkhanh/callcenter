import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { AccountDetailComponent } from './../account/account-detail/account-detail.component';
import { AccountRoutingModule } from './account-routing.module';
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
import { AccountComponent } from 'app/account/account.component';
import { AccountService } from 'app/shared/services/account.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AdvancedSearchAccountComponent } from './advanced-search-account/advanced-search-account.component';

@NgModule({
  imports: [
    AccountRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    AccountComponent, 
    AccountDetailComponent, CreateAccountComponent, EditAccountComponent, AdvancedSearchAccountComponent
  ],
  providers:[AccountService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class AccountModule { }