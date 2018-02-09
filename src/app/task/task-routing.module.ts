import { AuthGuard } from './../shared/guards/auth.guard';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskComponent } from './task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Task management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TaskComponent,
        data: {
          title: 'Task list'
        }
      },
      {
        path: 'detail-task',
        component: TaskDetailComponent,
        data: {
          title: 'Task'
        }
      },
      {
        path: 'create-task',
        component: CreateTaskComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-account',
        component: EditTaskComponent,
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
export class TaskRoutingModule {}
