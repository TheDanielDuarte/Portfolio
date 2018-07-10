import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Project } from '@models/project';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ContentfulService } from '@services/contentful.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public projects$: Observable<&Project[]>;
  @ViewChild('typedElement') private typedElement: ElementRef;

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

  ngAfterViewInit() {
    const typed = new Typed(this.typedElement.nativeElement, {
      strings: [
        'Hey welcome to my portfolio!',
        'I\'m Daniel Alejandro Duarte.',
        'I\'m Venezuelan.',
        'I live in Miami.',
        'También hablo español.',
        'I\'m very passionate for what I do.',
        'I enjoy learning new things.',
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      loopCount: Infinity
    });
  }

  public goTo(id: string) {
    this.router.navigate(['projects', id]);
  }
}
