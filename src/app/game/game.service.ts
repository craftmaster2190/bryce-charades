import { Options, OptionsService } from './options.service';
import { WordListsService } from './word-lists.service';
import { Injectable } from '@angular/core';

const shuffle = <T>(array: Array<T>) => {
  return array.sort(() => Math.random() - 0.5);
};

export class Game {
  private readonly words: Array<string>;
  private index = 0;
  private correctWords = [];
  private passedWords = [];
  private seconds: number;
  private startTime: number;
  constructor(words: Set<string>, private options: Options) {
    this.words = shuffle(Array.from(words));
    this.seconds = options.seconds;
  }

  start() {
    this.startTime = Date.now();
  }

  getCurrentWord(): string {
    return this.words[this.index];
  }

  getCurrentWordAndIncrement(): string {
    const word = this.getCurrentWord();
    this.index++;
    if (this.index >= this.words.length) {
      this.index = 0;
    }
    return word;
  }

  getSecondsRemaining(): number {
    return Math.max(
      0,
      this.seconds - Math.ceil((Date.now() - this.startTime) / 1000)
    );
  }

  addSecondsRemaining(seconds: number): number {
    this.seconds += seconds;
    return this.getSecondsRemaining();
  }

  accept(): string {
    this.correctWords.push(this.getCurrentWordAndIncrement());
    this.addSecondsRemaining(this.options.addTimeOnCorrect);
    return this.getCurrentWord();
  }

  pass(): string {
    this.passedWords.push(this.getCurrentWordAndIncrement());
    return this.getCurrentWord();
  }
}
@Injectable({
  providedIn: 'root'
})
export class GameService {
  public game?: Game;

  constructor(
    private readonly wordLists: WordListsService,
    private readonly options: OptionsService
  ) {}

  public createGame(wordList: string) {
    const defaultOptions = this.options.getDefaultOptions();
    this.game = new Game(this.wordLists.wordListMap[wordList], defaultOptions);
    return this.game;
  }

  public endGame() {
    this.game = undefined;
  }
}
