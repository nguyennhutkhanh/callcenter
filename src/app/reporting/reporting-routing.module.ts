import { AuthGuard } from './../shared/guards/auth.guard';
import { CaseActivityRecordComponent } from './case-activity-record/case-activity-record.component';
import { DepartmentSummaryDailyComponent } from './department-summary-daily/department-summary-daily.component';
import { StaffDailyComponent } from './staff-daily/staff-daily.component';
import { StaffSummarylDailyComponent } from './staff-summaryl-daily/staff-summaryl-daily.component';
import { CaseDetailDailyComponent } from './case-detail-daily/case-detail-daily.component';
import { CaseSummaryDailyComponent } from './case-summary-daily/case-summary-daily.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Report'
    },
    canActivate: [AuthGuard],
    children: [
        {
            path: 'casesummarydaily',
            component: CaseSummaryDailyComponent,
            data: {
              title: 'Case Summary Daily'
            }
          },
          {
            path: 'casedetaildaily',
            component: CaseDetailDailyComponent,
            data: {
              title: 'Case Detail Daily'
            }
          },
          {
            path: 'staffsummarydaily',
            component: StaffSummarylDailyComponent,
            data: {
              title: 'Staff Summary Daily'
            }
          },
          {
            path: 'staffdaily',
            component: StaffDailyComponent,
            data: {
              title: 'Staff Daily'
            }
          },
          {
            path: 'departmentsummarydaily',
            component: DepartmentSummaryDailyComponent,
            data: {
              title: 'Department Summary Daily'
            }
          },
          {
            path: 'caseactivityrecord',
            component: CaseActivityRecordComponent,
            data: {
              title: 'Case Activity Record'
            }
          }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule {}
