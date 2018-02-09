import { Observable } from 'rxjs/Observable';
import { PgService } from './pg.service';
import { Injectable } from '@angular/core';
import { CallContactJSon } from 'app/shared/models/call-contact';
import { Headers} from '@angular/http';

@Injectable()
export class CallContactService {
  constructor(public pg: PgService) { }
  
  getCallContacts(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('callcontacts', headers);
  }

  getCallContact(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('callcontacts/' + id, headers);
  }

  addCallContact(callcontact: CallContactJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('callcontacts', callcontact, headers);
  }

  updateCallContact(callcontact: CallContactJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('callcontacts', callcontact, headers);
  }

  deleteCallContact(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('callcontacts/'+id, headers);
  }
}
