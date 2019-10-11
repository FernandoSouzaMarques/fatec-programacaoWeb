import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-app-header></app-app-header>
    <router-outlet></router-outlet>
    <app-app-footer></app-app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'front-end';
}
