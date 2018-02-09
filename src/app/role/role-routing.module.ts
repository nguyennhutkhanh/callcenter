import { AuthGuard } from './../shared/guards/auth.guard';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from 'app/role/role.component';
import { CreateRoleComponent } from 'app/role/create-role/create-role.component';
import { EditRoleComponent } from 'app/role/edit-role/edit-role.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Role management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RoleComponent,
        data: {
          title: 'Role list'
        }
      },
      {
        path: 'create-role',
        component: CreateRoleComponent,
        data: {
          title: 'Create role'
        }
      },
      {
        path: 'edit-role/:id',
        component: EditRoleComponent,
        data: {
          title: 'Edit role'
        }
      },
      {
        path: 'assign-role/:id',
        component: AssignRoleComponent,
        data: {
          title: 'Assign Role'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
