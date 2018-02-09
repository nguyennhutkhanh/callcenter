import { ProjectJSon } from './../models/project';
import { PgService } from './pg.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';

@Injectable()
export class ProjectService {
  constructor(public pg: PgService) { }
  
  getProjects(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('projects', headers);
  }

  getProject(id: string):  Promise<any>{
    const headers = new Headers();
    
    return this.pg.get('projects/' + id, headers);
  }

  addProject(project: ProjectJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('projects', project, headers);
  }

  updateProject(project: ProjectJSon): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('projects', project, headers);
  }

  deleteProject(id: string): Promise<any>{
    const headers = new Headers();
    return this.pg.delete('projects/'+id, headers);
  }
}
