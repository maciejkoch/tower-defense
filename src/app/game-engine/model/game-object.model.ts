import { TilePosition } from '../position/position.model';

export interface GameObject {
  getTilePosition: () => TilePosition;

  update: (secondsPassed: number) => void;
  createDraw: () => {
    zIndex: number;
    draw: (ctx: CanvasRenderingContext2D) => void;
  }[];
}
