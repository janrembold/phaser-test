export default class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' })
  }

  preload() {
    // this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    // this.load.image('spaceship', 'assets/img/spaceship.png')
    // this.load.image('space', 'assets/img/space.jpg')
  }

  create() {
    this.add.image(100, 100, 'phaser-logo').setOrigin(0,0)
    
    const camera = this.cameras.main;
    this.input.on('wheel', (pointer, dx, dy, dz) => {
      console.log(dx, dy, dz);

      if (dz > 0) {
        var newZoom = camera.zoom - .01;
        console.log(newZoom);

        if (newZoom > 1) {
            camera.zoom = newZoom;     
        }
      }
    
      if (dz < 0) {
          var newZoom = camera.zoom + .01;
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
