import 'phaser';
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import PreloadScene from './scenes/preloadScene';
import { getWindowDimensions } from './utils/sizes';

// const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
// export const DEFAULT_HEIGHT = window.innerHeight;
// export const DEFAULT_WIDTH = window.innerWidth; // ratio * GAME_HEIGHT;
export const DEFAULT_WIDTH = 1200;
export const DEFAULT_HEIGHT = 1200;
// const SAFE_WIDTH = 1000;
// const SAFE_HEIGHT = 1000;
const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;
// const SCALE_MODE = 'FIT';

export const getRandomXY = () => ({
  x: Math.floor(Math.random() * DEFAULT_WIDTH),
  y: Math.floor(Math.random() * DEFAULT_HEIGHT),
});

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ff0000',
  // height: DEFAULT_HEIGHT,
  pixelArt: true,
  scale: {
    parent: 'game',
    // width: DEFAULT_WIDTH,
    // height: DEFAULT_HEIGHT,
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%',
  },
  scene: [PreloadScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
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

// window.addEventListener('load', () => {
//   game = new Phaser.Game(config);
// });

// window.addEventListener('resize', () => {
//   GAME_HEIGHT = window.innerHeight;
//   GAME_WIDTH = window.innerWidth;

//   if (game) {
//     console.log('global resize');
//     // game.scale.refresh();
//     game.scale.resize(window.innerWidth, window.innerHeight);
//   }
// });

export interface GameResizeEvent {
  width: number;
  height: number;
}

let resizeTimer: number;
window.addEventListener('load', () => {
  const game = new Phaser.Game(config);

  const resize = () => {
    console.log('resize');
    const { width, height } = getWindowDimensions();
    const newWidth = Math.min(width, MAX_WIDTH);
    const newHeight = Math.min(height, MAX_HEIGHT);

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
