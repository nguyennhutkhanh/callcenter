import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateAccountContactComponent } from './create-account-contact/create-account-contact.component';
import { AccountContactComponent } from './account-contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountContactDetailComponent } from 'app/account-contact/account-contact-detail/account-contact-detail.component';
import { EditAccountContactComponent } from 'app/account-contact/edit-account-contact/edit-account-contact.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Account contact management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AccountContactComponent,
        data: {
          title: 'Account contact list'
        }
      },
      {
        path: 'detail-account-contact/:id',
        component: AccountContactDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-account-contact',
        component: CreateAccountContactComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-account-contact/:id',
        component: EditAccountContactComponent,
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
export class AccountContactRoutingModule {}
