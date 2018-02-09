import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CallUserDetailComponent } from './../call-user/call-user-detail/call-user-detail.component';
import { CallUserRoutingModule } from './call-user-routing.module';
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
import { CallUserComponent } from 'app/call-user/call-user.component';
import { CallUserService } from 'app/shared/services/call-user.service';
import { CreateCallUserComponent } from './create-call-user/create-call-user.component';
import { EditCallUserComponent } from './edit-call-user/edit-call-user.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  imports: [
    CallUserRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    CallUserComponent, 
    CallUserDetailComponent, CreateCallUserComponent, EditCallUserComponent
  ],
  providers:[CallUserService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class CallUserModule { }