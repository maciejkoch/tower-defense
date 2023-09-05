import { GameObject } from './game-object.model';

export function createEnemy(): GameObject {
  return {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 10,
      height: 10,
    },
    speed: 10,
    update(secondsPassed: number) {
      this.position.x += this.speed * secondsPassed;
      this.position.y += this.speed * secondsPassed;
    },
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = '#ff8080';
      ctx.fillRect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      );
    },
  };
}
