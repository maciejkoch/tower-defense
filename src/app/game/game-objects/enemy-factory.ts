import { GameObject } from './game-object.model';
import { moveObject } from './move-object';

export function createEnemy(): GameObject {
  return {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 40,
      height: 40,
    },
    speed: 30,
    update(secondsPassed: number) {
      moveObject(this, secondsPassed);
    },
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(
        this.position.x + this.size.width / 2,
        this.position.y + this.size.height / 2,
        this.size.width / 2,
        0,
        2 * Math.PI
      );

      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';
      ctx.stroke();
    },
  };
}
