import { Department } from './../models/department';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
@Injectable()
export class DepartmentService {
  constructor(public pg: PgService) { }
  
  getDepts(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('department', headers);
  }

  getDept(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('department/' + id, headers);
  }

  addDept(dept: Department): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('department', dept, headers);
  }

  updateDept(dept: Department): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('department', dept, headers);
  }

  deleteDept(id: string): Promise<any>{
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    return this.pg.delete('department/'+id, headers);
  }

  getUsersOfDept(deptId: string): Promise<any>{
    const headers = new Headers();
    return this.pg.get('department/' + deptId + "/users", headers);
  }

  addUserForDept(deptId: string, userId: string): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    console.log(this.pg.getToken());
    return this.pg.post('department/addUser/' + deptId + "/" + userId, {}, headers);
  }

  deleteUserOfDept(deptId: string, userId: string): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    console.log(this.pg.getToken());
    return this.pg.post('department/removeUser/' + deptId + "/" + userId, {}, headers);
  }
}
