import { Observable } from 'rxjs/Observable';
import { PgService } from './pg.service';
import { Injectable } from '@angular/core';
import { CallUserJSon } from 'app/shared/models/call-user';
import { Headers} from '@angular/http';

@Injectable()
export class CallUserService {
  constructor(public pg: PgService) { }
  
  getCallUsers(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('callusers', headers);
  }

  getCallUser(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('callusers/' + id, headers);
  }

  addCallUser(calluser: CallUserJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('callusers', calluser, headers);
  }

  updateCallUser(calluser: CallUserJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('callusers', calluser, headers);
  }

  deleteCallUser(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('callusers/'+id, headers);
  }
}
