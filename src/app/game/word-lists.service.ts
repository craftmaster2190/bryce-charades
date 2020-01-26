import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordListsService {
  public readonly wordLists: Set<string>;

  private readonly GAME_WORD_LIST_PREFIX = 'GAME_WORD_LIST_';
  public readonly wordListMap: { [title: string]: Set<string> } = {};

  constructor() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.GAME_WORD_LIST_PREFIX)) {
        const title = key.substring(this.GAME_WORD_LIST_PREFIX.length);
        const words = new Set<string>(JSON.parse(localStorage.getItem(key)));
        this.wordListMap[title] = words;
      }
    }
    this.wordLists = new Set<string>(Object.keys(this.wordListMap));
  }

  public updateList(title: string, word: string) {
    this.wordListMap[title] = this.wordListMap[title] || new Set<string>();
    this.wordListMap[title].add(word);
  }
}
