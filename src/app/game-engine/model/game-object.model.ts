import { Size } from './size.model';
import { Sprite } from '../sprite/sprite.model';
import {
  Direction,
  RelativePosition,
  TilePosition,
} from '../position/position.model';

export interface GameObject {
  sprite: Sprite;
  position: RelativePosition;
  direction: Direction;
  target?: TilePosition[];

  size: Size;
  speed: number;

  update: (secondsPassed: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface StaticObject {
  position: TilePosition;

  draw: (ctx: CanvasRenderingContext2D) => void;
}
