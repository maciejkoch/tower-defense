import { TilePosition } from 'src/app/game-engine/position/position.model';
import { config } from '../../config';
import { Tower } from './tower.model';

export function createTower(position: TilePosition, price: number): Tower {
  let totalSeconds = 0;

  const drawGun = (ctx: CanvasRenderingContext2D, tower: Tower) => {
    const { tile } = config;
    const { x, y } = position;

    ctx.save();
    ctx.translate(x * tile + tile / 2, y * tile + tile / 2);
    ctx.rotate(tower.currentAngle + (Math.PI * 90) / 180);
    ctx.fillStyle = 'black';
    ctx.fillRect(-2.5, 0, 5, 11);
    ctx.restore();
  };

  const drawRange = (ctx: CanvasRenderingContext2D, tower: Tower) => {
    const { tile } = config;
    const { x, y } = position;

    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.beginPath();
    ctx.arc(
      x * tile + tile / 2,
      y * tile + tile / 2,
      tower.range * tile,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = 'pink';
    ctx.fill();
    ctx.restore();
  };

  return {
    position,
    range: 5,
    speed: 1.5,
    damage: 10,
    price,

    ready: true,

    currentAngle: 0,
    angle: 0,

    draw(ctx: CanvasRenderingContext2D) {
      const { tile } = config;
      const { x, y } = position;

      drawRange(ctx, this);

      ctx.fillStyle = 'red';
      ctx.fillRect(x * tile, y * tile, tile, tile);

      drawGun(ctx, this);
    },

    update(secondsPassed: number) {
      const { speed } = this;

      const realSpeed = speed * secondsPassed;
      const angleDifference = Math.abs(this.angle - this.currentAngle);
      if (angleDifference < realSpeed) {
        this.currentAngle = this.angle;
      } else {
        if (this.angle < this.currentAngle) {
          this.currentAngle -= realSpeed;
        } else {
          this.currentAngle += realSpeed;
        }
      }

      if (!this.ready) {
        totalSeconds += secondsPassed;

        if (totalSeconds > speed) {
          totalSeconds = 0;
          this.ready = true;
        }
      }
    },

    shoot() {
      const { ready } = this;
      if (ready) {
        this.ready = false;
      }
    },

    getTilePosition() {
      return this.position;
    },
  };
}
