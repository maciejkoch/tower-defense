import { TilePosition } from 'src/app/game-engine/position/position.model';
import { config } from '../../config';
import { calculateRotationDirection } from '../move/move-object';
import { Tower } from './tower.model';

export function createTower(position: TilePosition, price: number): Tower {
  let totalSeconds = 0;
  const rotateSpeed = 5;

  const drawGun = (ctx: CanvasRenderingContext2D, tower: Tower) => {
    const { tile } = config;
    const { x, y } = position;

    ctx.save();
    ctx.translate(x * tile + tile / 2, y * tile + tile / 2);
    ctx.rotate(tower.currentAngle + (Math.PI * 90) / 180);
    ctx.fillStyle = 'black';
    ctx.fillRect(-5, 0, 10, 32);
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

    createDraw() {
      const { tile } = config;
      const { x, y } = position;

      return [
        {
          zIndex: 0,
          draw: (ctx: CanvasRenderingContext2D) => {
            drawRange(ctx, this);
          },
        },
        {
          zIndex: 1,
          draw: (ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = 'red';
            ctx.fillRect(x * tile, y * tile, tile, tile);
          },
        },
        {
          zIndex: 2,
          draw: (ctx: CanvasRenderingContext2D) => {
            drawGun(ctx, this);
          },
        },
      ];
    },

    update(secondsPassed: number) {
      // gun rotation
      const realRotateSpeed = rotateSpeed * secondsPassed;
      const gunRotation = calculateRotationDirection(
        this.currentAngle,
        this.angle
      );
      if (Math.abs(this.angle - this.currentAngle) < 0.2) {
        this.currentAngle = this.angle;
      } else {
        if (gunRotation === 'left') {
          this.currentAngle -= realRotateSpeed;
        } else {
          this.currentAngle += realRotateSpeed;
        }

        if (this.currentAngle > Math.PI) {
          this.currentAngle -= Math.PI * 2;
        } else if (this.currentAngle < -Math.PI) {
          this.currentAngle += Math.PI * 2;
        }
      }

      // shoot cooldown
      if (!this.ready) {
        totalSeconds += secondsPassed;

        if (totalSeconds > this.speed) {
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
