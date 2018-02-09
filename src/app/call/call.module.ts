import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CallComponent } from 'app/call/call.component';
import { EditCallComponent } from './edit-call/edit-call.component';
import { CreateCallComponent } from './create-call/create-call.component';
import { CallDetailComponent } from './../call/call-detail/call-detail.component';
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
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { CallRoutingModule } from './call-routing.module';
import { CallService } from 'app/shared/services/call.service';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs/dist/es/dateinputs.module';

@NgModule({
  imports: [
    CallRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule, DateInputsModule
  ],
  declarations: [ 
    CallComponent, 
    CallDetailComponent, CreateCallComponent, EditCallComponent
  ],
  providers:[CallService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class CallModule { }