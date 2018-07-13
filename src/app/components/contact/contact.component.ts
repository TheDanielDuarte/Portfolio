import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SocialBlock } from '@models/social-block';
import { ContentfulService } from '@services/contentful.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public socialBlocks$: Observable<SocialBlock[]>;

  constructor(
    private title: Title,
    private contenful: ContentfulService
  ) { }

  ngOnInit() {
    this.socialBlocks$ = this.contenful.media();
    this.title.setTitle('Contact - Daniel Duarte');
  }
}
