import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('staggerLinks', [
      transition('* <=> *', [
        query('li', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('li', stagger('200ms', [
          animate('300ms 0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),

        query('li', [
          animate(1000, style('*'))
        ])
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  public showResponsiveMenu = false;
  public links = [
    { route: 'projects', name: 'Work' },
    { route: 'contact', name: 'Contact' },
    { route: 'skills', name: 'Skills' }
  ];

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  onToggleMenu(button) {
    this.showResponsiveMenu = !this.showResponsiveMenu;
    this.renderer.setStyle(document.body, 'overflow-y', this.showResponsiveMenu ? 'hidden' : 'auto' );
    const action = this.showResponsiveMenu ? 'addClass' : 'removeClass';
    this.renderer[action](button, 'is-active');
  }

}
