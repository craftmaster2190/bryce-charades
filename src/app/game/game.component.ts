import { GameService } from './game.service';
import { WordListsService } from './word-lists.service';
import {
  ScreenDirection,
  VerticalDirectionService
} from '../motion/vertical-direction.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  direction: ScreenDirection;
  subscription: Subscription;
  startTime = Date.now();
  timeRemaining: number;
  interval;

  constructor(
    private readonly verticalDirection: VerticalDirectionService,
    public readonly gameService: GameService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if (!this.gameService.game) {
      this.router.navigate(['lobby']);
      return;
    }

    this.interval = setInterval(() => this.checkTime(), 200);

    this.subscription = this.verticalDirection.direction.subscribe(
      (direction) => {
        if (this.direction !== direction) {
          this.direction = direction;
          if (this.direction === ScreenDirection.UP) {
            this.pass();
          } else if (this.direction === ScreenDirection.DOWN) {
            this.accept();
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  isStarted() {
    return Date.now() - 5000 > this.startTime;
  }

  isEnded() {
    return this.isStarted() && this.gameService.game.getSecondsRemaining() <= 0;
  }

  checkTime() {
    if (this.isStarted()) {
      this.gameService.game.start();
      this.timeRemaining = this.gameService.game.getSecondsRemaining();
    } else {
      this.timeRemaining = Math.ceil(
        (5000 - (Date.now() - this.startTime)) / 1000
      );
    }
  }

  getWord() {
    return this.gameService.game.getCurrentWord();
  }

  goHome() {
    this.gameService.endGame();
    this.router.navigate(['lobby']);
  }

  accept() {
    if (this.isStarted() && !this.isEnded()) {
      this.gameService.game.accept();
    }
  }

  pass() {
    if (this.isStarted() && !this.isEnded()) {
      this.gameService.game.pass();
    }
  }
}
