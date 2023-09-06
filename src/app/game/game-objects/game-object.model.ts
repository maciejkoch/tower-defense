export interface GameObject {
  position: {
    x: number;
    y: number;
  };

  target?: {
    x: number;
    y: number;
  };

  size: {
    width: number;
    height: number;
  };

  speed: number;

  update: (secondsPassed: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface HeroObject extends GameObject {
  img: HTMLImageElement;
  currentFrame: number;
  totalSeconds: number;
  direction: 0 | 1 | 2 | 3;
}
