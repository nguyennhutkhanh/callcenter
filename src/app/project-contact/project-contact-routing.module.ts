import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateProjectContactComponent } from './create-project-contact/create-project-contact.component';
import { ProjectContactComponent } from './project-contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectContactDetailComponent } from 'app/project-contact/project-contact-detail/project-contact-detail.component';
import { EditProjectContactComponent } from 'app/project-contact/edit-project-contact/edit-project-contact.component';

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
        component: ProjectContactComponent,
        data: {
          title: 'Project contact list'
        }
      },
      {
        path: 'detail-project-contact/:id',
        component: ProjectContactDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-project-contact',
        component: CreateProjectContactComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-project-contact/:id',
        component: EditProjectContactComponent,
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
export class ProjectContactRoutingModule {}
