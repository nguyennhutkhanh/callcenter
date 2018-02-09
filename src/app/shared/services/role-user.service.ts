import { Observable } from 'rxjs/Observable';
import { PgService } from './pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import { RoleUserJSon } from 'app/shared/models/role-user';
@Injectable()
export class RoleUserService {
  constructor(public pg: PgService) { }
  
  getRoleUsers(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('roleusers', headers);
  }

  getRoleUser(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('roleusers/' + id, headers);
  }

  addRoleUser(roleuser: RoleUserJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('roleusers', roleuser, headers);
  }

  UpdateRoleUser(roleuser: RoleUserJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('roleusers', roleuser, headers);
  }

  deleteRoleUser(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('roleusers/'+id, headers);
  }
}
