import { ActivatedRoute, Router } from '@angular/router';
import { EmailJSon } from './../../shared/models/email';
import { Component, OnInit } from '@angular/core';
import { EmailService } from 'app/shared/services/email.service';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.scss']
})
export class EmailDetailComponent implements OnInit {
  id: string;
  email: EmailJSon = new EmailJSon();
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private emailService: EmailService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetEmail(this.id);
   });
  }

  private async onGetEmail(id: string){
    this.emailService.getEmail(id)
    .then(result => {
      this.email = result;
    })
    .catch(error => {
    });
  }
  
  ConvertIntToDateTime(value: number) {
    var month = new Date(value).getMonth() + 1;
    var day = new Date(value).getDate();
    return new Date(value).getFullYear() + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
  }

  onEdit(id: string){
    this.router.navigate(["email/edit-email", id]);
  }

  onBack(){
    this.router.navigateByUrl("email");
  }
}
