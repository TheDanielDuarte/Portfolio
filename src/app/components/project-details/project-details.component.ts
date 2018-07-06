import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '@models/Project';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  public project$: Observable<Project>;

  constructor(
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.project$ = this.route.data.pipe( map(entry => entry['0']) );
  }

}
