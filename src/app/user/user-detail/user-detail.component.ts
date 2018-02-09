import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../shared/models/user';
import { UserService } from 'app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [UserService]
})
export class UserDetailComponent implements OnInit {
  id: string;
  user: User = new User();
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetUser(this.id);
   });
  }

  private async onGetUser(id: string){
    this.userService.getUser(id)
    .then(result => {
      this.user = result;
    })
    .catch(error => {
      if(error.status == undefined){
       
      }else{
       
      }
    });
  }

  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  onEdit(id: string){
    this.router.navigate(["user/edit-user", id]);
  }

  onBack(){
    this.router.navigateByUrl("user");
  }
}
