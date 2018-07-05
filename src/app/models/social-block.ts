export class SocialBlock {
  constructor(
    public value: string,
    public isURL: boolean,
    public id: string,
    public image: { url: string, alt: string },
    public alias?: string
  ) {}
}
