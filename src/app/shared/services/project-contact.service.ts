import { ProjectContactJSon } from './../models/project-contact';
import { Observable } from 'rxjs/Observable';
import { PgService } from './pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
@Injectable()
export class ProjectContactService {
  constructor(public pg: PgService) { }
  
  getProjectContacts(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('projectcontacts', headers);
  }

  getProjectContact(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('projectcontacts/' + id, headers);
  }

  addProjectContact(projectcontact: ProjectContactJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('projectcontacts', projectcontact, headers);
  }

  updateProjectContact(projectcontact: ProjectContactJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('projectcontacts', projectcontact, headers);
  }

  deleteProjectContact(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('projectcontacts/'+id, headers);
  }
}
