import { ActivatedRoute, Router } from '@angular/router';
import { ProjectJSon } from './../../shared/models/project';
import { ProjectService } from 'app/shared/services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [ProjectService]
})
export class ProjectDetailComponent implements OnInit {
  id: string;
  project: ProjectJSon = new ProjectJSon();
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id =  params['id'] || '';

      this.onGetProject(this.id);
   });
  }

  private async onGetProject(id: string){
    this.projectService.getProject(id)
    .then(result => {
      this.project = result;
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
    this.router.navigate(["project/edit-project", id]);
  }

  onBack(){
    this.router.navigateByUrl("project");
  }
}
