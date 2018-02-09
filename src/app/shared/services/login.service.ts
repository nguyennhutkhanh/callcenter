import { Observable } from 'rxjs/Observable';
import { PgService } from './pg.service';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class LoginService {
  constructor(public pg: PgService) { }
  
    login(username: string, password: string): Promise<any> {
      const headers = new Headers();
      headers.append('Content-Type','text/plain');
      return this.pg.postP('users/checkLogin/'+username + "/" + password, {}, headers)
    }
  
    isLoggedIn(){
      //return this.pg.getToken() !== null;
      return tokenNotExpired('id_token');
    }
  
    saveTokenInfoLocal(data){
      localStorage.setItem('id_token', data);
    }
  
    saveUserInfoLocal(data){
      localStorage.setItem('id', data.id);
      localStorage.setItem('fullName', data.firstName + ' ' + data.lastName);
    }

    getUserId(){
      return localStorage.getItem('id')
    }

    getUserFullName(){
      return localStorage.getItem('fullName')
    }

    loggout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('id');
      localStorage.removeItem('fullName');

      return this.pg.getToken() === null;
    }
}
