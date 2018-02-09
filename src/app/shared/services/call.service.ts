import { Observable } from 'rxjs/Observable';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import { CallJSon } from './../models/call';

@Injectable()
export class CallService {
  constructor(public pg: PgService) { }
  
  async getCalls(): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    return await this.pg.get('calls', headers);
  }

  async get5CallsByPhone(phone: string): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    return await this.pg.get('calls/contact5/' + phone, headers);
  }

  async getCall(id: string):  Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    return await this.pg.get('calls/' + id, headers);
  }

  async addCall(call: CallJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    console.log("Token: " + this.pg.getToken());
    return await this.pg.post('calls', call, headers);
  }

  async updateCall(call: CallJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return await this.pg.put('calls', call, headers);
  }

  deleteCall(id: string): Promise<any>{
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    return this.pg.delete('calls/'+id, headers);
  }
}
