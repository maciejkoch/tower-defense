export const config = {
  width: 800,
  height: 400,

  tile: 20,
};

export const enemyStart = {
  x: config.width / config.tile - 1,
  y: config.height / 2 / config.tile - 1,
};

export const enemyGoal = {
  x: 0,
  y: config.height / 2 / config.tile - 1,
};
