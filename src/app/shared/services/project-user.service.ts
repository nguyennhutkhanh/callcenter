import { ProjectUserJSon } from './../models/project-user';
import { Observable } from 'rxjs/Observable';
import { PgService } from './pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
@Injectable()
export class ProjectUserService {
  constructor(public pg: PgService) { }
  
  getProjectUsers(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('projectusers', headers);
  }

  getProjectUser(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('projectusers/' + id, headers);
  }

  addProjectUser(projectuser: ProjectUserJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('projectusers', projectuser, headers);
  }

  updateProjectUser(projectuser: ProjectUserJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('projectusers', projectuser, headers);
  }

  deleteProjectUser(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('projectusers/'+id, headers);
  }
}
