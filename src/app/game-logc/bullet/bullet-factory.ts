import { RelativePosition } from '../../game-engine/position/position.model';
import { moveObject } from '../move/move-object';
import { Bullet } from './bullet.model';

export function createBullet(
  position: RelativePosition,
  aim: RelativePosition,
  damage: number
): Bullet {
  return {
    damage,
    position,
    aim,
    speed: 300,
    done: false,
    update(secondsPassed: number) {
      const { aim } = this;

      const movement = moveObject(this, aim, secondsPassed);
      if (movement) {
        const { position } = movement;
        this.position = position;
      } else {
        this.done = true;
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      const { position } = this;

      ctx.beginPath();
      ctx.arc(position.x, position.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
    },
    getTilePosition() {
      return this.position;
    },
  };
}
