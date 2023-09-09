import { Position, Target } from './position.model';
import { Size } from './size.model';
import { Sprite } from '../sprite/sprite.model';

export interface GameObject {
  sprite: Sprite;
  position: Position;
  target?: Target[];

  size: Size;
  speed: number;

  update: (secondsPassed: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface StaticObject {
  tileX: number;
  tileY: number;

  draw: (ctx: CanvasRenderingContext2D) => void;
}
