export class SocialBlock {
  constructor(
    public value: string,
    public isURL: boolean,
    public id: string,
    public imageURL?: Promise<string>,
    public alias?: string
  ) {}
}
