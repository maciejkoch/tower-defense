export interface GameObject {
  // position: RelativePosition;
  // target?: TilePosition[];

  // size: Size;
  // speed: number;

  update: (secondsPassed: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}
