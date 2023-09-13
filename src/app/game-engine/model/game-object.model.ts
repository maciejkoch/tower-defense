import { RelativePosition, TilePosition } from '../position/position.model';
import { Size } from './size.model';

export interface GameObject {
  position: RelativePosition;
  target?: TilePosition[];

  size: Size;
  speed: number;

  update: (secondsPassed: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface StaticObject {
  position: TilePosition;

  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (secondsPassed: number) => void;
}
