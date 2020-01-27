import { GameService } from '../game/game.service';
import { GyroscopeService } from '../motion/gyroscope.service';
import { VerticalDirectionService } from '../motion/vertical-direction.service';
import { WordListsService } from '../game/word-lists.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { throttle } from 'rxjs/operators';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public notSupported = 'Loading Gyroscope...';
  public currentWordList: string;
  public addWord: string;

  constructor(
    private readonly gyroscope: GyroscopeService,
    public readonly wordLists: WordListsService,
    private readonly gameService: GameService,
    private readonly router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.notSupported = this.gyroscope.notSupportedMessage;
  }

  addListClick(content) {
    this.modalService
      .open(content)
      .result.then(() => {})
      .catch(() => {});
  }

  startGame(wordList) {
    this.gameService.createGame(wordList);
    this.router.navigate(['game']);
  }
}
