import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';
import { SocialBlock } from '../../models/social-block';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public socialBlocks$: Observable<SocialBlock[]>;

  constructor(
    private title: Title,
    private contact: ContactService
  ) { }

  ngOnInit() {
    this.socialBlocks$ = this.contact.allMedia();
    this.title.setTitle('Contact');
  }

}
