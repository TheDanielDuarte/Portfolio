import { Observable } from 'rxjs';

export type SkillType = 'Front-End' | 'Back-End' | 'Mobile' | 'Databases' | 'CMSs';

export class Skill {
  constructor(
    public id: string,
    public name: string,
    public group: SkillType
  ) { }
}

export class SkillGroup {
  constructor(
    public name: SkillType,
    public content: string[],
    public image?: Observable<string>
  ) { }
}
