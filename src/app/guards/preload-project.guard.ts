import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentfulService } from '@services/contentful.service';
import { Project } from '@models/project';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreloadProjectGuard implements Resolve<Project> {
  constructor(
    private contentful: ContentfulService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
    const slug = route.paramMap.get('slug');

    return this.contentful.project(slug).pipe(
      map(entries => entries.items),
      map(([entry]) => entry),
      map(entry => ({ ...entry.fields, id: entry.sys.id } as &Project)),
      // @ts-ignore
      map(entry => ({ ...entry, image: entry.image.fields.file.url } as Project))
    );
  }
}
