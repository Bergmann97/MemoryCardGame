import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  deck: Card[] = [];

  /**
   * generates 10 different kind of memory cards two times
   * 
   * @returns the basic memory card deck (ordered)
   */
  generateDeck(): Card[] {
    for (let i = 1; i <= 10; i++) {
      const element: Card = {
        id: i,
        state: "unclickable"
      };

      this.deck.push({ ...element });
      this.deck.push({ ...element });
    }
    return this.deck;
  }

  /**
   * randomly shuffles the given memory card deck
   * 
   * @param cardDeck the full memory card deck
   * @returns the shuffled memory card deck
   */
  shuffleCards(cardDeck: Card[]): Card[] {
    let currentIndex: number = cardDeck.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      
      [cardDeck[currentIndex], cardDeck[randomIndex]] = [
        cardDeck[randomIndex], cardDeck[currentIndex]];
    }

    this.deck = cardDeck;
    return cardDeck;
  }

  /**
   * covers all cards in the given card list
   * 
   * @param cardDeck the card deck to cover
   */
  activateCards(cardDeck: Card[]) {
    for (let i = 0; i < cardDeck.length; i++) {
      const element = cardDeck[i];
      element.state = "covered";
    }
  }

  /**
   * makes all cards in given card deck disabled
   * 
   * @param cardDeck the card deck to disable
   */
  deactivateCards(cardDeck: Card[]) {
    for (let i = 0; i < cardDeck.length; i++) {
      const element = cardDeck[i];
      element.state = "unclickable";
    }
  }
}
