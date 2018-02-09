import { AuthGuard } from './../shared/guards/auth.guard';
import { CustomerComponent } from './customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CustomerComponent,
        data: {
          title: 'Customer Info'
        }
      },
      {
        path: 'add',
        component: CustomerComponent,
        data: {
          title: 'Add new'
        }
      },
      {
        path: 'edit/:id',
        component: CustomerComponent,
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
export class CustomerRoutingModule {}
