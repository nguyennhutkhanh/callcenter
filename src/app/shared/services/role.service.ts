import { RoleJSon } from './../models/role';
import { Observable } from 'rxjs/Observable';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';

@Injectable()
export class RoleService {
  constructor(public pg: PgService) { }
  
  getRoles(): Promise<any> {
    const headers = new Headers();

    return this.pg.get('aclRoles', headers);
  }

  getRole(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('aclRoles/'+id, headers);
  }

  addRole(role: RoleJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('aclRoles', role, headers);
  }

  updateRole(role: RoleJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('aclRoles', role, headers);
  }
  
  deleteRole(id: string): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('id', id);

    return this.pg.delete('aclRoles', headers);
  }

  getActionNameRole(){
    const headers = new Headers();
    
    return this.pg.get('aclActions/name/distinct', headers);
  }

  getActionValueRole(id: string) : Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('aclRolesActions/action/' + id, headers);
  }

  getActionValue(category: string, name: string) : Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('aclActions/action/' + category +"/"+name, headers);
  }

  addOrUpdateActionRole(roleId: string, actionId: string, assign: number) : Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    var obj = {
      "roleId": roleId,
      "actionId": actionId,
      "assign": assign
    };
    
    return this.pg.post('aclRolesActions/assign', obj ,headers);
  }
}
