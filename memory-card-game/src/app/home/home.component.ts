import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryCardComponent } from '../memory-card/memory-card.component';
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MemoryCardComponent,
  ],
  template: `

  <div class="explanation">
    Welcom to this Memory Card Game by OneXip! Tap the Cards below to flip them. You can flip only 2 cards at a time.<br/>
    Click "Start Game" and try your best<br/>
  </div>

  <div class="container">
    <div class="toolbar">
      <form>
        <button class="primary" type="button" [disabled]="startDis" (click)="initGame()">Start Game</button>
        <button class="primary" type="button" [disabled]="resetDis" (click)="resetGame()">Reset Game</button>
      </form>
    </div>
  </div>

  <div class="container2">
    <ng-container *ngIf="solved; else showCount">
      <p><strong>Congratulations! You matched all Memory Cards! Needed Moves: {{ moves.toString() }}</strong></p>
    </ng-container>
    <ng-template #showCount>
      <p>Matched Cards: <strong>{{ finishedCards.toString() }} </strong> / {{ maximum.toString() }} | Moves: <strong>{{ moves.toString() }}</strong></p>
    </ng-template>
  </div>

  <div class="grid">
    <app-memory-card
      *ngFor="let card of deck; let idx=index"
      [card]="card"
      (clickedCard)="clickedCard(idx)"
      [showBack]="card.state">
    </app-memory-card>
  </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cardService: CardService = inject(CardService);

  deck: Card[] = [];

  maximum: number = 0;

  flippedCards: Card[] = [];
  finishedCards: number = 0;
  moves: number = 0;

  startDis: boolean = false;
  resetDis: boolean = true;
  solved: boolean = false;

  constructor() {
    this.deck = this.cardService.generateDeck();
  }

  initGame() {
    this.cardService.shuffleCards(this.deck);
    this.cardService.activateCards(this.deck);

    this.startDis = true;
    this.resetDis = false;
    this.maximum = this.deck.length/2;
  }

  clickedCard(index: number) {
    const card = this.deck[index];
    console.log("FLIP CARD: " + card.id);

    if (card.state == "covered" && this.flippedCards.length < 2) {
      card.state = "uncovered";
      this.flippedCards.push(card);

      if (this.flippedCards.length == 2) {
        this.checkPair();
        this.moves++;
      }
    }
  }

  checkPair() {
      const card1: Card = this.flippedCards[0];
      const card2: Card = this.flippedCards[1];

      if (card1.id == card2.id) {
        console.log("YOU FOUND A PAIR -> " + this.finishedCards.toString());
        this.finishedCards++;
        this.flippedCards = [];
        card1.state = "paired";
        card2.state = "paired";

        if (this.finishedCards == this.maximum) {
          console.log("YOU HAVE FOUND ALL PAIRS! CONGRATULATIONS!");
          this.solved = true;
        }

      } else {
        setTimeout(() => {
          console.log("THIS WAS NO PAIR");
          this.flippedCards = [];
          card1.state = "covered";
          card2.state = "covered";
          },
          2000);
      }
  }

  resetGame() {
    this.cardService.shuffleCards(this.deck);
    this.cardService.deactivateCards(this.deck);

    this.maximum = 0;
    this.flippedCards = [];
    this.finishedCards = 0;
    this.solved = false;
    this.startDis = false;
    this.resetDis = true;
    this.moves = 0;
  }
}
