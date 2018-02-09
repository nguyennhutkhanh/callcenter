import { AuthGuard } from './../shared/guards/auth.guard';
import { CallComponent } from './call.component';
import { CreateCallComponent } from './create-call/create-call.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCallComponent } from 'app/call/edit-call/edit-call.component';
import { CallDetailComponent } from 'app/call/call-detail/call-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Call management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CallComponent,
        data: {
          title: 'Call list'
        }
      },
      {
        path: 'detail-call/:id',
        component: CallDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-call',
        component: CreateCallComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'create-call/:phone',
        component: CreateCallComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-call/:id',
        component: EditCallComponent,
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
export class CallRoutingModule {}
