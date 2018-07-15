import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContentfulService } from '@services/contentful.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectDoesExistGuard implements CanActivate {
  constructor(
    private router: Router,
    private contentful: ContentfulService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const slug = route.paramMap.get('slug');

    return this.contentful.project(slug).pipe(
      switchMap(value => {
        const exists = value.items.length !== 0;
        if (!exists) {
          this.router.navigate(['/error']);
        }
        return of(exists);
      })
    );
  }
}
