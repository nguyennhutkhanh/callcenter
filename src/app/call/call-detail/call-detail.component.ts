import { CallJSon } from './../../shared/models/call';
import { CallService } from './../../shared/services/call.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'app/shared/services/department.service';

@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.scss'],
  providers: [CallService, DepartmentService]
})
export class CallDetailComponent implements OnInit {
  id: string;
  call: CallJSon = new CallJSon();
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private callService: CallService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetCall(this.id);
   });
  }

  private async onGetCall(id: string){
    this.callService.getCall(id)
    .then(result => {
      this.call = result;
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
    this.router.navigate(["call/edit-call", id]);
  }

  onBack(){
    this.router.navigateByUrl("call");
  }
}
