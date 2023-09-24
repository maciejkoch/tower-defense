import {
  toRelativePosition,
  toTilePosition,
} from '../../game-engine/position/position';
import { TilePosition } from '../../game-engine/position/position.model';
import { createSprite } from '../../game-engine/sprite/sprite-factory';
import { calculateTarget, moveObject } from '../move/move-object';
import { Enemy } from './enemy.model';

export function createEnemy(tilePosition: TilePosition, hp: number): Enemy {
  const size = {
    width: 20,
    height: 40,
  };

  const sprite = createSprite({
    img: 'assets/enemy.png',
    tileSize: {
      width: 48,
      height: 48,
    },
    size,
    frames: 3,
    defaultFrame: 1,
    animationSpeed: 0.2,
  });

  return {
    sprite,
    position: toRelativePosition(tilePosition),
    direction: 0,
    size,
    speed: 30,
    hp,
    currentHp: hp,
    update(secondsPassed: number) {
      const { target = [] } = this;

      if (target.length) {
        const nextTarget = target[0];
        const movement = moveObject(this, nextTarget, secondsPassed);

        if (movement) {
          const { position, direction } = movement;
          this.position = position;
          this.direction = direction;

          this.sprite.update(secondsPassed);
        } else {
          target.shift();
        }
      } else {
        this.sprite.reset();
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      const { position, direction } = this;
      this.sprite.draw(ctx, position, direction);

      // hp bar
      const { x, y } = position;
      const hpBarWidth = 10;
      const hpBarHeight = 3;
      const hpBarX = x - hpBarWidth / 2;
      const hpBarY = y + 3;
      const hpBarCurrentWidth = (hpBarWidth * this.currentHp) / this.hp;

      ctx.fillStyle = 'red';
      ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
      ctx.fillStyle = 'green';
      ctx.fillRect(hpBarX, hpBarY, hpBarCurrentWidth, hpBarHeight);
    },
    setTarget(target: TilePosition, obstacles: number[][]) {
      const realTarget = toRelativePosition(target);
      this.target = calculateTarget(this, realTarget, obstacles);
    },
    getTilePosition() {
      return toTilePosition(this.position);
    },
  };
}
