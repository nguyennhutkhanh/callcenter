import { AdvancedSearchUserComponent } from './../user/advanced-search-user/advanced-search-user.component';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from 'app/account/account-detail/account-detail.component';
import { EditAccountComponent } from 'app/account/edit-account/edit-account.component';
import { AdvancedSearchAccountComponent } from 'app/account/advanced-search-account/advanced-search-account.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Account management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AccountComponent,
        data: {
          title: 'Account list'
        }
      },
      {
        path: 'detail-account/:id',
        component: AccountDetailComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create-account',
        component: CreateAccountComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'create-account/:phone',
        component: CreateAccountComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'edit-account/:id',
        component: EditAccountComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'advanced-search-account',
        component: AdvancedSearchAccountComponent,
        data: {
          title: 'Advanced search'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
