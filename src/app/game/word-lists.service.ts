import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordListsService {
  public readonly wordLists: Set<string>;

  private readonly GAME_WORD_LIST_PREFIX = 'GAME_WORD_LIST_';
  public readonly wordListMap: { [title: string]: Set<string> } = {};

  constructor() {
    this.wordListMap['Game of Thrones'] = new Set<string>([
      'Aegon Targaryen',
      'Aeron Greyjoy',
      'Aerys II Targaryen',
      'Alton Lannister',
      'Arya Stark',
      'Balon Greyjoy',
      'Baratheon Guard',
      'Benjen Stark',
      'Black Walder Rivers',
      'Brandon Stark',
      'Bran Stark',
      'Brynden Tully',
      'Catelyn Stark',
      'Cersei Lannister',
      'Daenerys Targaryen',
      'Doran Martell',
      'Drogon',
      'Eddard Stark',
      'Edmure Tully',
      'Ellaria Sand',
      'Elia Martell',
      'Euron Greyjoy',
      'Gendry',
      'Ghost',
      'Grey Wind',
      'Hoster Tully',
      'Jaime Lannister',
      'Jeor Mormont',
      'Joffrey Baratheon',
      'Jon Snow',
      'Jorah Mormont',
      'Kevan Lannister',
      'Kitty Frey',
      'Lancel Lannister',
      'Loras Tyrell',
      'Lothar Frey',
      'Lyanna Mormont',
      'Lyanna Stark',
      'Lysa Arryn',
      'Mace Tyrell',
      'Maester Aemon',
      'Margaery Tyrell',
      'Martyn Lannister',
      'Myrcella Baratheon',
      'Ned Umber',
      'Nymeria',
      'Nymeria Sand',
      'Obara Sand',
      'Oberyn Martell',
      'Olenna Tyrell',
      'Ramsay Snow',
      'Renly Baratheon',
      'Rhaegal',
      'Rhaegar Targaryen',
      'Rhaella Targaryen',
      'Rhaenys Targaryen',
      'Rickard Stark',
      'Rickon Stark',
      'Robb Stark',
      'Robert Baratheon',
      'Roose Bolton',
      'Roslin Frey',
      'Sansa Stark',
      'Selyse Baratheon',
      'Shaggydog',
      'Shireen Baratheon',
      'Stannis Baratheon',
      'Stevron Frey',
      'Summer',
      'Talisa Maegyr',
      'Talla Tarly',
      'Theon Greyjoy',
      'Tommen Baratheon',
      'Trystane Martell',
      'Tyene Sand',
      'Tyrion Lannister',
      'Tywin Lannister',
      'Viserion',
      'Viserys Targaryen',
      'Walda Bolton',
      'Walder Frey',
      'Willem Lannister',
      'Yara Greyjoy'
    ]);

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
