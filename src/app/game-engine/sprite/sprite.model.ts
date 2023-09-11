import { Size } from '../model/size.model';
import { Direction, RelativePosition } from '../position/position.model';

export interface Sprite {
  currentFrame: number;
  image: HTMLImageElement;
  config: SpriteConfig;

  reset: () => void;
  update: (secondsPassed: number) => void;
  draw: (
    ctx: CanvasRenderingContext2D,
    position: RelativePosition,
    direction: Direction
  ) => void;
}

export interface SpriteConfig {
  img: string;
  tileSize: Size;
  size: Size;
  frames: number;
  defaultFrame: number;
  animationSpeed: number;
}
