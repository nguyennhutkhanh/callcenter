import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CaseComponent } from 'app/case/case.component';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { CreateCaseComponent } from './create-case/create-case.component';
import { CaseDetailComponent } from './../case/case-detail/case-detail.component';
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
import { CaseRoutingModule } from './case-routing.module';
import { CaseService } from 'app/shared/services/case.service';

@NgModule({
  imports: [
    CaseRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, GridModule, HttpClientModule, ButtonModule, DialogModule, DropDownsModule, InputsModule
  ],
  declarations: [ 
    CaseComponent, 
    CaseDetailComponent, CreateCaseComponent, EditCaseComponent
  ],
  providers:[CaseService, HttpClient, AuthGuard, LoginService, PgService ]
})
export class CaseModule { }