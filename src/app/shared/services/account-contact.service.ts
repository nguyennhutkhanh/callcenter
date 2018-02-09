import { PgService } from './pg.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AccountContactJSon } from 'app/shared/models/account-contact';
import { Headers} from '@angular/http';
@Injectable()
export class AccountContactService {

  constructor(public pg: PgService) { }
  
  getAccountContacts(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('accountcontacts', headers);
  }

  getAccountContact(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('accountcontacts/' + id, headers);
  }

  addAccountContact(accountcontact: AccountContactJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('accountcontacts', accountcontact, headers);
  }

  updateAccountContact(accountcontact: AccountContactJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('accountcontacts', accountcontact, headers);
  }

  deleteAccountContact(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('accountcontacts/'+id, headers);
  }

}
