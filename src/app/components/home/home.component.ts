import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Project } from '@models/project';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ContentfulService } from '@services/contentful.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public projects$: Observable<&Project[]>;

  constructor(
    private contentful: ContentfulService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    // @ts-ignore
    this.projects$ = this.contentful.projects().pipe(
      map(projects => projects.map(proj => {
        if (proj.overviewColors.platform) {
          return proj;
        }

        if (proj.platform === 'Fullstack') {
          proj.overviewColors.platform = 'red';
        } else if (proj.platform === 'Javascript Back End') {
          proj.overviewColors.platform = '';
        } else if (proj.platform === 'Front End') {
          proj.overviewColors.platform = '';
        }

        return proj;
      }))
    );

    this.title.setTitle('Work');
  }

  public goTo(id: string) {
    this.router.navigate(['projects', id]);
  }
}
