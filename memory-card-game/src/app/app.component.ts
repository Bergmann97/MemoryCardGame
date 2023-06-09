import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <main>
    <section class="content">
    </section>
  </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memory-card-game';
}