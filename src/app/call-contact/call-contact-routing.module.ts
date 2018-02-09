import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateCallContactComponent } from './create-call-contact/create-call-contact.component';
import { CallContactComponent } from './call-contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallContactDetailComponent } from 'app/call-contact/call-contact-detail/call-contact-detail.component';
import { EditCallContactComponent } from 'app/call-contact/edit-call-contact/edit-call-contact.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Call Contact management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CallContactComponent,
        data: {
          title: 'Call Contact list'
        }
      },
      {
        path: 'detail-call-contact/:id',
        component: CallContactDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-call-contact',
        component: CreateCallContactComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-call-contact/:id',
        component: EditCallContactComponent,
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
export class CallContactRoutingModule {}
