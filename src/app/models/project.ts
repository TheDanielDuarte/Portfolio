import { Observable } from 'rxjs';
type Platform = 'Fullstack' | 'Android (Java)' | 'Front End' | 'Javascript Back End' | 'Java Back End';

export class Project {
  constructor(
    public id: string,
    public name: string,
    public important: boolean,
    public imageUrl: string | Observable<string>,
    public shortDescription: string,
    public platform: Platform,
    public overviewColors: { bg: string, text: string, platform: string }
  ) {}
}
