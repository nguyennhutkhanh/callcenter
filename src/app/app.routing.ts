import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,         
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
      },
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
      },
      {
        path: 'role',
        loadChildren: './role/role.module#RoleModule',
      },
      {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactModule',
      },
      {
        path: 'department',
        loadChildren: './department/department.module#DepartmentModule',
      },
      {
        path: 'customer/:phone',
        loadChildren: './customer/customer.module#CustomerModule',
      },
      {
        path: 'task',
        loadChildren: './task/task.module#TaskModule',
      },
      {
        path: 'case',
        loadChildren: './case/case.module#CaseModule',
      },
      {
        path: 'call',
        loadChildren: './call/call.module#CallModule',
      },
      {
        path: 'project',
        loadChildren: './project/project.module#ProjectModule',
      },
      {
        path: 'email',
        loadChildren: './email/email.module#EmailModule',
      },
      {
        path: 'list-case',
        loadChildren: './list-case/list-case.module#ListCaseModule',
      },
      {
        path: 'product',
        loadChildren: './product/product.module#ProductModule',
      },
      {
        path: 'reporting',
        loadChildren: './reporting/reporting.module#ReportingModule',
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  },
  {
    path: '**',
    component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '**',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
