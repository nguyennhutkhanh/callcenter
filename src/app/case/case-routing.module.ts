import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateCaseComponent } from './create-case/create-case.component';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import { CaseComponent } from './case.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCallComponent } from 'app/call/edit-call/edit-call.component';
import { EditCaseComponent } from 'app/case/edit-case/edit-case.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Case management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CaseComponent,
        data: {
          title: 'Case list'
        }
      },
      {
        path: 'detail-case/:id',
        component: CaseDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-case',
        component: CreateCaseComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'create-case/:phone',
        component: CreateCaseComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'create-case/:id',
        component: CreateCaseComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-case/:id',
        component: EditCaseComponent,
        data: {
          title: 'Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseRoutingModule {}
