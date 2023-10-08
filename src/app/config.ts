export const config = {
  width: 1200,
  height: 800,

  tile: 40,
};

export const enemyStart = {
  x: config.width / config.tile - 1,
  y: config.height / config.tile - 1,
};

export const enemyGoal = {
  x: 0,
  y: 0,
};
