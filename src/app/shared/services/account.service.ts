import { AccountJSon } from './../models/account';
import { Observable } from 'rxjs/Observable';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';

@Injectable()
export class AccountService {
  constructor(public pg: PgService) { }
  
  getAccounts(): Promise<any> {
    const headers = new Headers();
    console.log(this.pg.getToken());
    return this.pg.get('accounts', headers);
  }

  getAccount(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('accounts/' + id, headers);
  }

  async addAccount(account: AccountJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return await this.pg.post('accounts', account, headers);
  }

  async updateAccount(account: AccountJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return await this.pg.put('accounts', account, headers);
  }

  async deleteAccount(id: string): Promise<any>{
    const headers = new Headers();
    return await this.pg.delete('accounts/'+id, headers);
  }

  async advancedSearchAccount(account: any): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await this.pg.post('accounts', account, headers);
  }
}
