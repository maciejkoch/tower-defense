import { config } from '../config';
import { Size } from '../model/size.model';

export function drawBoard(ctx: CanvasRenderingContext2D, size: Size) {
  const { width, height } = size;
  const { tile } = config;
  for (let i = 0; i <= width; i += tile) {
    ctx.moveTo(0.5 + i, 0);
    ctx.lineTo(0.5 + i, height);
  }

  for (let i = 0; i <= height; i += tile) {
    ctx.moveTo(0, 0.5 + i + tile);
    ctx.lineTo(width + tile, 0.5 + i + tile);
  }

  ctx.strokeStyle = '#ddd';
  ctx.stroke();
}
