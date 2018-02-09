import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateContactUserComponent } from './create-contact-user/create-contact-user.component';
import { ContactUserComponent } from './contact-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUserDetailComponent } from 'app/contact-user/contact-user-detail/contact-user-detail.component';
import { EditContactUserComponent } from 'app/contact-user/edit-contact-user/edit-contact-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Contact User management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContactUserComponent,
        data: {
          title: 'Contact User list'
        }
      },
      {
        path: 'detail-contact-user/:id',
        component: ContactUserDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-contact-user',
        component: CreateContactUserComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-contact-user/:id',
        component: EditContactUserComponent,
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
export class ContactUserRoutingModule {}
