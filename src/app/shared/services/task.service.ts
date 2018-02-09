import { Observable } from 'rxjs/Observable';
import { PgService } from 'app/shared/services/pg.service';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import { TaskJson } from 'app/shared/models/task';

@Injectable()
export class TaskService {
  constructor(public pg: PgService) { }
  
  getTasks(): Promise<any> {
    const headers = new Headers();
    return this.pg.get('tasks', headers);
  }

  getTask(id: string):  Promise<any>{
    const headers = new Headers();
    return this.pg.get('tasks/' + id, headers);
  }

  addTask(task: TaskJson): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.post('tasks', task, headers);
  }

  updateTask(task: TaskJson): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this.pg.getToken());

    return this.pg.put('tasks', task, headers);
  }

  deleteTask(id: string): Promise<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.pg.delete('tasks/' + id, headers);
  }
}
