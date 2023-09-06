export interface Position {
  x: number;
  y: number;

  direction?: Direction;
}

export interface Target {
  x: number;
  y: number;
}
export type Direction = 0 | 1 | 2 | 3;
