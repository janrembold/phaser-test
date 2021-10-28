export default class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }

  preload() {
    this.load.image('earth', 'assets/img/earth.png');
  }

  create() {
    this.add.image(100, 100, 'earth').setOrigin(0, 0).setScale(0.1);

    const camera = this.cameras.main;
    this.input.on('wheel', (pointer, dx, dy, dz) => {
      console.log(dx, dy, dz);

      if (dz > 0) {
        const newZoom = camera.zoom - 0.01;
        console.log(newZoom);

        if (newZoom > 1) {
          camera.zoom = newZoom;
        }
      }

      if (dz < 0) {
        const newZoom = camera.zoom + 0.01;
        console.log(newZoom);

        if (newZoom < 1.8) {
          camera.zoom = newZoom;
        }
      }

      // this.camera.centerOn(pointer.worldX, pointer.worldY);
      // this.camera.pan(pointer.worldX, pointer.worldY, 2000, "Power2");
    });
  }
}
