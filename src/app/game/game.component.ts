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
  currentWord: string;
  subscription: Subscription;

  constructor(
    private readonly verticalDirection: VerticalDirectionService,
    private readonly gameService: GameService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if (!this.gameService.game) {
      this.router.navigate(['lobby']);
      return;
    }

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
  }

  accept() {
    this.currentWord = this.gameService.game.accept();
  }

  pass() {
    this.currentWord = this.gameService.game.pass();
  }
}
