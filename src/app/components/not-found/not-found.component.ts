import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <span class="error-code">404</span>

    <div class="text">
      <h4>Oops... looks like you got lost</h4>
      <p>Get back home by clicking <a routerLink="/projects">here</a></p>
    </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

}
