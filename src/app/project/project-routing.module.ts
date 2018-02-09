import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectComponent } from './project.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailComponent } from 'app/project/project-detail/project-detail.component';
import { EditProjectComponent } from 'app/project/edit-project/edit-project.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Project management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectComponent,
        data: {
          title: 'Project list'
        }
      },
      {
        path: 'detail-project/:id',
        component: ProjectDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-project',
        component: CreateProjectComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-project/:id',
        component: EditProjectComponent,
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
export class ProjectRoutingModule {}
