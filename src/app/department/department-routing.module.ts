import { CreateDepartmentComponent } from './create-department/create-department.component';
import { DepartmentComponent } from './department.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditDepartmentComponent } from 'app/department/edit-department/edit-department.component';
import { DepartmentDetailComponent } from 'app/department/department-detail/department-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Department management'
    },
    children: [
      {
        path: '',
        component: DepartmentComponent,
        data: {
          title: 'Department list'
        }
      },
      {
        path: 'create-department',
        component: CreateDepartmentComponent,
        data: {
          title: 'Add new'
        }
      },
      {
        path: 'edit-department/:id',
        component: EditDepartmentComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        path: 'detail-department/:id',
        component: DepartmentDetailComponent,
        data: {
          title: 'Detail'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule {}
