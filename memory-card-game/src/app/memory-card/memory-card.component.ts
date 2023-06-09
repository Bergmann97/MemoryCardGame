import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../card';

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="showBack=='unclickable'; else showCard">
      <div class="card_d">
        <div class="img">
          <img src="assets/d.png" />
        </div>
      </div>
    </ng-container>
    <ng-template #showCard>
      <ng-container *ngIf="showBack=='covered'; else showFront">
        <div class="card" (click)="clickedCard.emit()">
          <div class="img">
            <img src="assets/0.png" />
          </div>
        </div>
      </ng-container>
      <ng-template #showFront>
        <ng-container *ngIf="showBack=='uncovered'; else showSolved">
          <div class="card">
            <div class="img">
              <img [src]="'assets/' + card.id.toString() + '.png'" />
            </div>
          </div>
        </ng-container>
        <ng-template #showSolved>
          <div class="card_s">
            <div class="img">
              <img [src]="'assets/' + card.id.toString() + '.png'" />
            </div>
          </div>
        </ng-template>
      </ng-template>
    </ng-template>
  `,
  styleUrls: ['./memory-card.component.css']
})
export class MemoryCardComponent {

  @Input() card!: Card;  // the card to display
  @Input() showBack!: string;  // indicator for flipping the card
  @Output() clickedCard = new EventEmitter();  // EventHandler for clicking on Card

  constructor() {}

}
