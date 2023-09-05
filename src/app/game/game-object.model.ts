export interface GameObject {
  position: {
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
