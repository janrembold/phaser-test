export default class DebugScene extends Phaser.Scene {
  fpsText;

  constructor() {
    super({ key: 'DebugScene' });
  }

  create() {
    this.fpsText = this.add.text(0, 0, 'Loading...', { color: 'black', fontSize: '25px' });
  }

  update() {
    this.fpsText.setText(
      `fps: ${Math.floor(this.game.loop.actualFps)} - zoom: ${this.cameras.main.zoom}, camX: ${
        this.cameras.main.scrollX
      }, camY: ${this.cameras.main.scrollY} - gaem w/h: ${this.game.scale.width}/${this.game.scale.height}`,
    );
  }
}
