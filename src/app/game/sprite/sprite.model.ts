import { Position } from '../model/position.model';
import { Size } from '../model/size.model';

export interface Sprite {
  currentFrame: number;
  image: HTMLImageElement;

  position: Position;
  config: SpriteConfig;

  reset: () => void;
  update: (secondsPassed: number, position: Position) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface SpriteConfig {
  img: string;
  tileSize: Size;
  size: Size;
  frames: number;
  defaultFrame: number;
  animationSpeed: number;
  defaultPosition: Position;
}
