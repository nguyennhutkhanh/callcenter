import { AuthGuard } from './../shared/guards/auth.guard';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Product management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProductComponent,
        data: {
          title: 'Product list'
        }
      },
      {
        path: 'add',
        component: ProductComponent,
        data: {
          title: 'Add new'
        }
      },
      {
        path: 'edit/:id',
        component: ProductComponent,
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
export class ProductRoutingModule {}
