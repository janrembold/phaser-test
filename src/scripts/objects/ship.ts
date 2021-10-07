export default class Ship extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 10, 10, 'spaceship')
    scene.add.existing(this)
    // this.setOrigin(0)
  }

  public update() {
    // this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)
  }
}
