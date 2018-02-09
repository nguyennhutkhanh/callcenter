import { AdvancedSearchUserComponent } from './advanced-search-user/advanced-search-user.component';
import { AuthGuard } from './../shared/guards/auth.guard';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from 'app/user/user-detail/user-detail.component';
import { CreateUserComponent } from 'app/user/create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserComponent,
        data: {
          title: 'User list'
        }
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
        data: {
          title: 'User detail'
        }
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        data: {
          title: 'Create User'
        }
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
        data: {
          title: 'Edit User'
        }
      },
      {
        path: 'advanced-search-user',
        component: AdvancedSearchUserComponent,
        data: {
          title: 'Advancedd search'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
