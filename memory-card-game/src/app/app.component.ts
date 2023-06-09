import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
  ],
  template: `
  <main>
    <section class="content">
      <app-home></app-home>
    </section>
  </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memory-card-game';
}
