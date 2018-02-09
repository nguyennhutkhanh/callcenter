import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateCallUserComponent } from './create-call-user/create-call-user.component';
import { CallUserComponent } from './call-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallUserDetailComponent } from 'app/call-user/call-user-detail/call-user-detail.component';
import { EditCallUserComponent } from 'app/call-user/edit-call-user/edit-call-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Call User management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CallUserComponent,
        data: {
          title: 'Call User list'
        }
      },
      {
        path: 'detail-call-user/:id',
        component: CallUserDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-call-user',
        component: CreateCallUserComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-call-user/:id',
        component: EditCallUserComponent,
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
export class CallUserRoutingModule {}
