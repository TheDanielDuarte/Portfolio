import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillGroup, Skill } from '@models/skill';
import { ContentfulService } from '@services/contentful.service';
import { map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  public skillSet$: Observable<SkillGroup[]>;

  constructor(private contentful: ContentfulService, private title: Title) { }

  ngOnInit() {
    this.skillSet$ = this.contentful.skills().pipe(
      map(skills => skills.reduce((acc, curr) => {
        const index = acc.findIndex(value => value.name === curr.group);
        if (index === -1) {
          acc.push({ name: curr.group, content: [curr.name] });
        } else {
          acc[index].content.push(curr.name);
        }

        return acc;
      }, [] as SkillGroup[])),
      map(skills => skills.map(skill => {
        const imageURL = this.contentful.getSkillImageByTitle(skill.name);
        return { ...skill, image: imageURL };
      }))
    );

    this.title.setTitle('Skills - Daniel Duarte');
  }

  public getNames(content: Skill[]) {
    return content.map(items => items.name);
  }
}
