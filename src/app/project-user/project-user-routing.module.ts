import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateProjectUserComponent } from './create-project-user/create-project-user.component';
import { ProjectUserComponent } from './project-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectUserDetailComponent } from 'app/project-user/project-user-detail/project-user-detail.component';
import { EditProjectUserComponent } from 'app/project-user/edit-project-user/edit-project-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Project User management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectUserComponent,
        data: {
          title: 'Project User list'
        }
      },
      {
        path: 'detail-project-user/:id',
        component: ProjectUserDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-project-user',
        component: CreateProjectUserComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-project-user/:id',
        component: EditProjectUserComponent,
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
export class ProjectUserRoutingModule {}
