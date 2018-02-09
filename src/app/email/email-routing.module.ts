import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateEmailComponent } from './create-email/create-email.component';
import { EmailComponent } from './email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailDetailComponent } from 'app/email/email-detail/email-detail.component';
import { EditEmailComponent } from 'app/email/edit-email/edit-email.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Email management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EmailComponent,
        data: {
          title: 'Email list'
        }
      },
      {
        path: 'detail-email/:id',
        component: EmailDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-email',
        component: CreateEmailComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-email/:id',
        component: EditEmailComponent,
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
export class EmailRoutingModule {}
