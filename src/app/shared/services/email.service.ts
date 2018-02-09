import { EmailJSon } from './../models/email';
import { Observable } from 'rxjs/Observable';
import { PgService } from './pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';

@Injectable()
export class EmailService {
  constructor(public pg: PgService) { }
  
  getEmails(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('emails', headers);
  }

  getEmail(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('emails/' + id, headers);
  }

  addEmail(email:EmailJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('emails', email, headers);
  }

  updateEmail(email:EmailJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('emails', email, headers);
  }

  deleteEmail(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('emails/'+id, headers);
  }
}
