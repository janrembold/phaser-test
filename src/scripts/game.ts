import 'phaser';
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import PreloadScene from './scenes/preloadScene';
import { getWindowDimensions } from './utils/sizes';

export const DEFAULT_WIDTH = 1500;
export const DEFAULT_HEIGHT = 1500;
export const WORLD_WIDTH = 2000;
export const WORLD_HEIGHT = 2000;

export const getRandomXY = () => ({
  x: Math.floor(Math.random() * WORLD_WIDTH),
  y: Math.floor(Math.random() * WORLD_HEIGHT),
});

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ff0000',
  height: WORLD_HEIGHT,
  width: WORLD_WIDTH,
  pixelArt: true,
  scale: {
    parent: 'game',
    width: '100%',
    height: '100%',
  },
  scene: [PreloadScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  plugins: {
    scene: [
      {
        key: 'rexGestures',
        plugin: GesturesPlugin,
        mapping: 'rexGestures',
      },
    ],
  },
};

export interface GameResizeEvent {
  width: number;
  height: number;
}

let resizeTimer: number;
window.addEventListener('load', () => {
  const game: Phaser.Game = new Phaser.Game(config);

  const resize = () => {
    console.log('resize');

    const { width, height } = getWindowDimensions();
    const newWidth = Math.min(width, WORLD_WIDTH);
    const newHeight = Math.min(height, WORLD_HEIGHT);

    game.scale.resize(newWidth, newHeight);

    const event = new CustomEvent<GameResizeEvent>('game-resize', {
      detail: { width: newWidth, height: newHeight },
    });
    window.dispatchEvent(event);
  };

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 250);
  });

  resize();
});
