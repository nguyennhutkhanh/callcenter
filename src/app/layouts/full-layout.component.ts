import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthGuard } from './../shared/guards/auth.guard';
import { PgService } from './../shared/services/pg.service';
import { LoginService } from './../shared/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [LoginService, PgService, AuthGuard],
})
export class FullLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  userFullName: string = '';
  constructor(private fb: FormBuilder, public router: Router, public loginService: LoginService) {
    this.userFullName = this.loginService.getUserFullName();
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {}

  onLogOut(){
    if(this.loginService.loggout())
      this.router.navigate(['/login']);
  }
}
