import { AuthGuard } from './../shared/guards/auth.guard';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailComponent } from 'app/contact/contact-detail/contact-detail.component';
import { AdvancedSearchContactComponent } from 'app/contact/advanced-search-contact/advanced-search-contact.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Contact management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContactComponent,
        data: {
          title: 'Contact list'
        }
      },
      {
        path: 'detail-contact/:id',
        component: ContactDetailComponent,
        data: {
          title: 'Contact detail'
        }
      },
      {
        path: 'create-contact',
        component: CreateContactComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'create-contact/:phone',
        component: CreateContactComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-contact/:id',
        component: EditContactComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'advanced-search-contact',
        component: AdvancedSearchContactComponent,
        data: {
          title: 'Advanced Search'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {}
