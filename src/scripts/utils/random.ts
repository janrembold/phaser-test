import { WORLD_HEIGHT, WORLD_WIDTH } from '../game';

interface WorldPosition {
  x: number;
  y: number;
}

export const getRandomWorldPosition = (): WorldPosition => ({
  x: Math.floor(Math.random() * WORLD_WIDTH),
  y: Math.floor(Math.random() * WORLD_HEIGHT),
});

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
