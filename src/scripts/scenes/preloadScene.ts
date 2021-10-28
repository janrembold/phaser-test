import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../game';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png');
  }

  create() {
    this.add.image(DEFAULT_WIDTH / 2 - 100, DEFAULT_HEIGHT / 2 - 100, 'phaser-logo').setOrigin(0, 0);
    // .setInteractive()
    // .on('pointerdown', () => {
    //   this.scene.start('MainScene')
    // })
    // this.scene.start('MainScene')
    // this.scene.launch('MainScene');
    // this.scene.launch('DebugScene');
    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    const someCondition = true;
    if (someCondition) {
      setTimeout(() => {
        import(/* webpackChunkName: "mainScene" */ './mainScene').then((mainScene) => {
          this.scene.add('MainScene', mainScene.default, true);
        });
      }, 1500);
    } else {
      console.log('The mainScene class will not even be loaded by the browser');
    }
  }
}
