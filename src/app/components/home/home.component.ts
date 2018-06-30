import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { Project } from '../../models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public projects$: Observable<&Project[]>;

  constructor(
    private projects: ProjectsService,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit() {
    // @ts-ignore
    this.projects$ = this.projects.all().pipe(
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
      })),
      map(projects => projects.map((proj) => {
        const ref = this.storage.storage.ref(`projects/${proj.id}.png`);
        return { ...proj, imageUrl: ref.getDownloadURL() };
      }))
    );
  }

  public goTo(id: string) {
    this.router.navigate(['projects', id]);
  }
}
