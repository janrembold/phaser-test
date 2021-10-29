import 'phaser';
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import PreloadScene from './scenes/preloadScene';
import { getWindowDimensions } from './utils/sizes';

export const WORLD_WIDTH = 2560;
export const WORLD_HEIGHT = 1440;
export let MAX_ZOOM = 1;
export const MIN_ZOOM = 2;
let resizeTimer: number;

export interface GameResizeEvent {
  width: number;
  height: number;
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
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

window.addEventListener('load', () => {
  const game: Phaser.Game = new Phaser.Game(config);

  const resize = () => {
    const { width, height } = getWindowDimensions();
    const newWidth = Math.min(width, WORLD_WIDTH);
    const newHeight = Math.min(height, WORLD_HEIGHT);

    MAX_ZOOM = Math.max(newWidth / WORLD_WIDTH, newHeight / WORLD_HEIGHT);

    game.scale.resize(newWidth, newHeight);

    const elem = document.getElementById('resize');
    if (elem) {
      elem.style.backgroundColor = 'red';
      setTimeout(() => (elem.style.backgroundColor = 'white'), 3000);
    }

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
