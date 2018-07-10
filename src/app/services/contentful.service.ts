import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from '@env/environment';
import { Project } from '@models/project';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Skill, SkillType } from '@models/skill';
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
    const promise = this.client.getEntries<SocialBlock>({ 'content_type': 'socialBlock', ...query });

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

  public skills(query: any = {}): Observable<Skill[]> {
    const promise = this.client.getEntries<Skill>({ 'content_type': 'skill', ...query });

    return from(promise).pipe(
      map(entries => entries.items),
      map(items => items.map(item => ({ ...item.fields, id: item.sys.id } as Skill)) )
    );
  }

  public getSkillImageByTitle(title: SkillType) {
    let id: string;

    switch (title) {
      case 'CMSs': {
        id = '2lbsZn8hqgyg2mAi2UC422';
        break;
      }
      case 'Back-End': {
        id = '7pXvv5zLqgqKYqaS0OUUGA';
        break;
      }
      case 'Front-End': {
        id = '37K95B8rteySG8kEG4OM8I';
        break;
      }
      case 'Databases': {
        id = 'BCI7PEuOfAQIu2AUAwe6K';
        break;
      }

      default: id = '6p0afG4Ms8q6cSEAce2Eag';
    }

    const promise = this.client.getAsset(id);

    return from(promise).pipe(
      map(items => items.fields.file.url),
      tap(console.log),
    );
  }
}
