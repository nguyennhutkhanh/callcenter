import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PgService } from 'app/shared/services/pg.service';
import { Headers} from '@angular/http';
import { User } from 'app/shared/models/user';

@Injectable()
export class UserService {
  constructor(public pg: PgService) { }
  
  getUsers(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('users', headers);
  }

  getUser(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('users/' + id, headers);
  }

  addUser(user: User): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    console.log("Token: " + this.pg.getToken() );
    return this.pg.post('users', user, headers);
  }

  UpdateUser(user: User): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('users', user, headers);
  }

  deleteUser(id: string): Promise<any>{
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    return this.pg.delete('users/' + id, headers);
  }

  advancedSearchUser(user: any): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.pg.post('users/search/advanced', user, headers);
  }
}
