import { Observable } from 'rxjs/Observable';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import { Case } from 'app/shared/models/case';

@Injectable()
export class CaseService {
  constructor(public pg: PgService) { }
  
  getCases(index, pageSize): Promise<any> {
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    console.log("Token: " + this.pg.getToken())
    return this.pg.get('cases/'+ index + "/" + pageSize, headers);
  }

  getCasesByUser(id: string): Promise<any> {
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    console.log("Token: " + this.pg.getToken())
    return this.pg.get('cases/user/' + id, headers);
  }

  get5CasesByPhone(phone: string): Promise<any> {
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    console.log("Token: " + this.pg.getToken())
    return this.pg.get('cases/account5/'+phone, headers);
  }

  getCasesByDept(id: string): Promise<any> {
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    console.log("Token: " + this.pg.getToken())
    return this.pg.get('cases/dept/' + id, headers);
  }

  getCase(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('cases/'+id, headers);
  }

  addCase(caseJson: Case): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('cases', caseJson, headers);
  }

  updateCase(caseJson: Case): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());
    console.log(this.pg.getToken());
    return this.pg.put('cases', caseJson, headers);
  }

  deleteCase(id: string): Promise<any>{
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    return this.pg.delete('cases/'+id, headers);
  }
}
