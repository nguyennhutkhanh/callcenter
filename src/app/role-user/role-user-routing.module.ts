import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateRoleUserComponent } from './create-role-user/create-role-user.component';
import { RoleUserComponent } from './role-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleUserDetailComponent } from 'app/role-user/role-user-detail/role-user-detail.component';
import { EditRoleUserComponent } from 'app/role-user/edit-role-user/edit-role-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Role User management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RoleUserComponent,
        data: {
          title: 'Role User list'
        }
      },
      {
        path: 'detail-role-user/:id',
        component: RoleUserDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-role-user',
        component: CreateRoleUserComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-role-user/:id',
        component: EditRoleUserComponent,
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
export class RoleUserRoutingModule {}
