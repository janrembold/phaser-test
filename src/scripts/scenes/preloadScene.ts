export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('spaceship', 'assets/img/spaceship.png')
    this.load.image('space', 'assets/img/space.jpg')
  }

  create() {
    // this.add.image(0,0, 'phaser-logo').setOrigin(0,0)
    // .setInteractive()
    // .on('pointerdown', () => {
    //   this.scene.start('MainScene')
    // })

    // this.scene.start('MainScene')
    this.scene.launch('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
