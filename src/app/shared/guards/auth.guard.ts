import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: LoginService, private router: Router){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

      if(this.auth.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
  }
}
