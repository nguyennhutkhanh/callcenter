import { ContactUserJSon } from './../models/contact-user';
import { Observable } from 'rxjs/Observable';
import { PgService } from './pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';

@Injectable()
export class ContactUserService {
  constructor(public pg: PgService) { }
  
  getContactUsers(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('contactusers', headers);
  }

  getContactUser(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('contactusers/' + id, headers);
  }

  addContactUser(contactuser: ContactUserJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('contactusers', contactuser, headers);
  }

  updateContactUser(contactuser: ContactUserJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('contactusers', contactuser, headers);
  }

  deleteContactUser(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('contactusers/'+id, headers);
  }
}
