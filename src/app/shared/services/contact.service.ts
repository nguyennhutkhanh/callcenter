import { Contact } from 'app/shared/models/contact';
import { Observable } from 'rxjs/Observable';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';

@Injectable()
export class ContactService {
  constructor(public pg: PgService) { }
  
  getContacts(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('contacts', headers);
  }

  getContact(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('contacts/' + id, headers);
  }

  async addContact(contact: Contact): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    console.log("Token: " + this.pg.getToken());
    return await this.pg.post('contacts', contact, headers);
  }

  async updateContact(contact: Contact): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return await this.pg.put('contacts', contact, headers);
  }

  async deleteContact(id: string): Promise<any>{
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    console.log("Token: " + this.pg.getToken());
    return await this.pg.delete('contacts/'+id, headers);
  }

  async advancedSearchContact(contact: any): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await this.pg.post('contacts/search/advanced', contact, headers);
  }

  async searchContactByPhone(phone: string): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    return await this.pg.get('contacts/phoneNumber/'+ phone, headers);
  }
}
