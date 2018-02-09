import { ReportingRoutingModule } from './reporting-routing.module';
import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CaseSummaryDailyComponent } from './case-summary-daily/case-summary-daily.component';
import { CaseDetailDailyComponent } from './case-detail-daily/case-detail-daily.component';
import { StaffSummarylDailyComponent } from './staff-summaryl-daily/staff-summaryl-daily.component';
import { StaffDailyComponent } from './staff-daily/staff-daily.component';
import { DepartmentSummaryDailyComponent } from './department-summary-daily/department-summary-daily.component';
import { CaseActivityRecordComponent } from './case-activity-record/case-activity-record.component';
import { RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ReportingRoutingModule, ChartsModule, FormsModule, ReactiveFormsModule, CommonModule
  ],
  declarations: [ 
    CaseSummaryDailyComponent,
    CaseDetailDailyComponent,
    StaffSummarylDailyComponent,
    StaffDailyComponent,
    DepartmentSummaryDailyComponent,
    CaseActivityRecordComponent,
  ],
  providers:[AuthGuard, LoginService, PgService]
})
export class ReportingModule { }