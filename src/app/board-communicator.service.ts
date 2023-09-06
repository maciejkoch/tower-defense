import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameObject } from './game/game-objects/game-object.model';
import { setTarget } from './game/game-objects/move-object';

@Injectable({
  providedIn: 'root',
})
export class BoardCommunicatorService {
  private _gameObjectAdded$ = new BehaviorSubject<GameObject | undefined>(
    undefined
  );
  private hero: GameObject | undefined;
  private enemies: GameObject[] = [];

  get gameObjectAdded$() {
    return this._gameObjectAdded$.asObservable();
  }

  private addGameObject(gameObject: GameObject) {
    this._gameObjectAdded$.next(gameObject);
  }

  addHero(hero: GameObject) {
    this.hero = hero;
    this.addGameObject(hero);
  }
  addEnemy(enemy: GameObject) {
    this.enemies.push(enemy);
    this.addGameObject(enemy);
  }

  onClick(position: { x: number; y: number }) {
    if (this.hero) {
      setTarget(this.hero, position);
    }
  }

  update(secondsPassed: number) {
    this.enemies.forEach((enemy) => {
      if (this.hero) {
        setTarget(enemy, {
          x: this.hero.position.x + this.hero.size.width / 2,
          y: this.hero.position.y + this.hero.size.height / 2,
        });
      }
    });
  }
}
