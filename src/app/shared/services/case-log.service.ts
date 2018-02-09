import { Observable } from 'rxjs/Observable';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import { Case } from 'app/shared/models/case';

@Injectable()
export class CaseLogService {
  constructor(public pg: PgService) { }
  
  getCaseLogsByCase(id): Promise<any> {
    const headers = new Headers();
    headers.append('token', this.pg.getToken());
    console.log("Token: " + this.pg.getToken())
    return this.pg.get('casesLog/case/'+ id, headers);
  }
  
}
