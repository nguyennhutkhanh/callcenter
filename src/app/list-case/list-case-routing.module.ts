import { AuthGuard } from './../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCaseComponent } from 'app/list-case/list-case.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Case list management'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ListCaseComponent,
        data: {
          title: 'Cases'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCaseRoutingModule {}