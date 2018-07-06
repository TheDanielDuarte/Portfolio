import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentfulService } from '@services/contentful.service';
import { Project } from '@models/project';

@Injectable({
  providedIn: 'root'
})
export class PreloadProjectGuard implements Resolve<Project> {
  constructor(
    private contentful: ContentfulService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
    const slug = route.paramMap.get('slug');

    return this.contentful.project(slug);
  }
}
