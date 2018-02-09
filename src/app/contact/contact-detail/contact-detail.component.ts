import { Contact } from './../../shared/models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/shared/services/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  providers: [ContactService]
})
export class ContactDetailComponent implements OnInit {
  id: string;
  contact: Contact = new Contact();
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetContact(this.id);
   });
  }

  private async onGetContact(id: string){
    this.contactService.getContact(id)
    .then(result => {
      this.contact = result;
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
    this.router.navigate(["contact/edit-contact", id]);
  }

  onBack(){
    this.router.navigateByUrl("contact");
  }
}
