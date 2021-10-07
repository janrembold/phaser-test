import 'phaser'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import TestScene from './scenes/testScene';

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
export const GAME_HEIGHT =  window.innerHeight;
export const GAME_WIDTH = ratio * GAME_HEIGHT;

export const getRandomXY = () => ({
    x: Math.floor(Math.random() * GAME_WIDTH), 
    y: Math.floor(Math.random() * GAME_HEIGHT)
  })

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#010005',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  scene: [PreloadScene, MainScene, TestScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  plugins: {
    scene: [
      {
        key: 'rexGestures',
        plugin: GesturesPlugin,
        mapping: 'rexGestures'
      },
    ]
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
