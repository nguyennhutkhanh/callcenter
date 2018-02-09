import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Request, Headers, Response, RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
export interface PgBatchCall {
  proc: string;
  args: any;
}

@Injectable()
export class PgService {
  private userToken = null;
  public badTokenEvents: Subject<boolean> = new Subject<boolean>();

  private baseUrl : string;

  constructor(private http: Http) { 
    this.getBaseUrl();
  }

  public setToken(token){
    localStorage.setItem('id_token', token);
    this.userToken = token;
  }

  public getToken(): string{
    return localStorage.getItem('id_token');
  }

  getString(url: string, headers: Headers) {
    
    return this.http.get(`${this.baseUrl}/${url}`, { headers })
    .do(() => { },
    (error: Response) => {
      const text: string = error.text();
      if (text.match(/insufficient_privilege/)) {
        this.badTokenEvents.next(true);
      }
      return Observable.throw(text);
    })
    .map((res: Response) => {
      return res.text();
    });
  }

  get(url: string, headers: Headers) :Promise<any>{
    
    return this.http.get(`${this.baseUrl}/${url}`, { headers })
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  post(url: string, body: Object, headers: Headers) :Promise<any>{
    // if (this.userToken === null) {
    //   this.userToken = this.getToken();
    // }

    // headers.append('token', this.userToken);

    console.log(JSON.stringify(body));
    return this.http.post(`${this.baseUrl}/${url}`, JSON.stringify(body), { headers })
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  put(url: string, body: Object, headers: Headers) :Promise<any>{
    // if (this.userToken === null) {
    //   this.userToken = this.getToken();
    // }

    // headers.append('token', this.userToken);

    console.log(JSON.stringify(body));
    return this.http.put(`${this.baseUrl}/${url}`, JSON.stringify(body), { headers })
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  delete(url: string, headers: Headers) :Promise<any> {
    // if (this.userToken === null) {
    //   this.userToken = this.getToken();
    // }

    // headers.append('token', this.userToken);
    // console.log('toke: ' + this.userToken);
    return this.http.delete(`${this.baseUrl}/${url}`, { headers })
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  postP(url: string, body: Object, headers: Headers) : Promise<any>{
    if (this.userToken === null) {
      this.userToken = this.getToken();
    }

    headers.append('token', this.userToken);

    console.log(JSON.stringify(body));

    return this.http.post(`${this.baseUrl}/${url}`, JSON.stringify(body), { headers })
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    try{
      let body = res.json();
      return body || {};
    }
    catch(e){
      return {};
    }
}

private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
}
  request(url: string, method: RequestMethod, body?: Object) : Observable<any>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    if (this.userToken === null) {
      this.userToken = localStorage.getItem('id_token');
    }

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      headers: headers,
      method: method
    });

    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
    .do(() => { },
    (error: Response) => {
      const text: string = error.text();
      if (text.match(/insufficient_privilege/)) {
        this.badTokenEvents.next(true);
      }
      return Observable.throw(text);
    })
    .map(res => res.json());
  }

  pgbatch(calls: PgBatchCall[]) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.userToken === null) {
      this.userToken = localStorage.getItem('id_token');
    }
    calls = calls.map(c => { c.args.prm_token = this.userToken; return c; });

    return this.http.post(this.baseUrl + 'batch', JSON.stringify(calls), { headers })
      .do(() => { },
      (error: Response) => {
        const text: string = error.text();
        if (text.match(/insufficient_privilege/)) {
          this.badTokenEvents.next(true);
        }
        return Observable.throw(text);
      })
      .map(res => res.json());
  }

  getBaseUrl(){
    this.baseUrl = environment.url;
  }
}
