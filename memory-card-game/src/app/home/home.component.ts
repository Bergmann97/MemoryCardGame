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
  cardService: CardService = inject(CardService);  // will manage the cards
  deck: Card[] = [];  // will include the Memory Cards

  maximum = 0;  // will give the target pairs

  flippedCards: Card[] = [];  // will include the flipped cards
  finishedCards = 0;  // will count how many pairs where found
  moves = 0;          // will count how many time the user tried to find pairs

  // variables to control buttons and displays
  startDis = false;
  resetDis = true;
  solved = false;

  /**
   * will initially generate a deck with 10 pairs
   */
  constructor() {
    this.deck = this.cardService.generateDeck();
  }

  /**
   * will be called when start is pressed. will then shuffle the cards and activates them and defines the target pair
   * count
   */
  initGame() {
    this.cardService.shuffleCards(this.deck);
    this.cardService.activateCards(this.deck);

    this.startDis = true;
    this.resetDis = false;
    this.maximum = this.deck.length/2;
  }

  /**
   * eventhandler for clicking on a card. Will check if another card can be flipped and will then flip it and check
   * if a pair was found
   * 
   * @param index index of clicked card
   */
  clickedCard(index: number) {
    const card = this.deck[index];  // get the clicked card
    console.log("FLIP CARD: " + card.id);

    // check if the card is not already flipped and if not already 2 cards are flipped
    if (card.state == "covered" && this.flippedCards.length < 2) {
      card.state = "uncovered";
      this.flippedCards.push(card);

      // if this was the second card, check if a pair was found
      if (this.flippedCards.length == 2) {
        this.checkPair();
        this.moves++;
      }
    }
  }

  /**
   * reads flipped cards and checks if they are the same. if it is the same keep them flipped otherwise cover them again
   * 
   * this function has a smaller delay, such that the user can have a look at the flipped cards
   */
  checkPair() {
      const card1: Card = this.flippedCards[0];
      const card2: Card = this.flippedCards[1];

      // check if a pair was found
      if (card1.id == card2.id) {
        console.log("YOU FOUND A PAIR -> " + this.finishedCards.toString());
        this.finishedCards++;
        this.flippedCards = [];
        card1.state = "paired";
        card2.state = "paired";

        // check if all pairs where found and set game as solved
        if (this.finishedCards == this.maximum) {
          console.log("YOU HAVE FOUND ALL PAIRS! CONGRATULATIONS!");
          this.solved = true;
        }
      } else {  // no pair found
        setTimeout(() => {
          console.log("THIS WAS NO PAIR");
          // remove the flipped cards from memory and cover them again
          this.flippedCards = [];
          card1.state = "covered";
          card2.state = "covered";
          },
          2000);
      }
  }

  /**
   * resets all parts of the game. shuffles the card deck and deactivates them (new game start need click on start)
   * sets the controler variables for UI and resets memory variables
   */
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
