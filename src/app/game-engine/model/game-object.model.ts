import { TilePosition } from '../position/position.model';

export interface GameObject {
  getTilePosition: () => TilePosition;

  update: (secondsPassed: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}
