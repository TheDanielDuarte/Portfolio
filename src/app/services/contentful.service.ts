import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from '@env/environment';
import { Project } from '@models/project';
import { Observable, from } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { SocialBlock } from '@models/social-block';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private readonly client: contentful.ContentfulClientApi;

  constructor() {
    this.client = contentful.createClient({
      space: environment.contentful.spaceID,
      accessToken: environment.contentful.token
    });
  }

  public projects(query: any = {}): Observable<Project[]> {
    const promise = this.client.getEntries<Project>({ 'content_type': 'project', ...query });

    return from(promise).pipe(
      map(entries => entries.items),
      map(items => items.map(item => ({ ...item.fields, id: item.sys.id } as &Project))),
      // @ts-ignore
      map(items => items.map(item => ({ ...item, image: item.image.fields.file.url } as Project)))
    );
  }

  public media(query: any = {}): Observable<SocialBlock[]> {
    const promise = this.client.getEntries<SocialBlock>({ 'content_type': 'socialBlock' });

    return from(promise).pipe(
      map(entries => entries.items),
      map(items => items.map(item => ({ ...item.fields, id: item.sys.id } as &SocialBlock))),
      // @ts-ignore
      map(items => items.map(item => {
        // @ts-ignore
        const { title: alt, file: { url } } = item.image.fields;

        return { ...item, image: { url, alt } };
      }))
    );
  }

  public project(slug: string): Observable<Project> {
    const promise = this.client.getEntries<Project>({
      'content_type': 'project',
      'fields.slug': slug
    });

    return from(promise).pipe(
      map(entries => entries.items),
      map(([entry]) => entry),
      map(entry => ({ ...entry.fields, id: entry.sys.id } as &Project)),
      // @ts-ignore
      map(entry => ({ ...entry, image: entry.image.fields.file.url } as Project))
    );
  }
}
