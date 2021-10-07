import { getRandomXY } from '../game';
import FpsText from '../objects/fpsText'

interface ShipObject {
  ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  target: { x: number, y: number}
}

export default class MainScene extends Phaser.Scene {
  fpsText;
  spaceship;
  space;
  target = new Phaser.Math.Vector2();
  shipCount = 10;
  ships: ShipObject[] = [];

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    // this.load.image('spaceship', 'assets/img/spaceship.png')
    // this.load.image('space', 'assets/img/space.jpg')
  }

  create() {
    // const camera = this.camera;
    this.space = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'space');
      
    console.log('cams', this.cameras)

    const camera = this.cameras.main;
    // const camera2 = this.cameras.scene.
    this.input.on('wheel', (pointer, dx, dy, dz) => {
      console.log(dx, dy, dz);

      if (dz > 0) {
        var newZoom = camera.zoom - .003;
        console.log(newZoom);

        if (newZoom >= 1) {
            camera.zoom = newZoom;     
        }
      }
    
      if (dz < 0) {
          var newZoom = camera.zoom + .003;
          console.log(newZoom);

          if (newZoom < 1.8) {
              camera.zoom = newZoom;     
          }
      }

      // this.camera.centerOn(pointer.worldX, pointer.worldY);
      // this.camera.pan(pointer.worldX, pointer.worldY, 2000, "Power2");
      
    });

    


    const pinch = (this as any).rexGestures.add.pinch();
    pinch
      .on('drag1', function (pinch) {
          var drag1Vector = pinch.drag1Vector;
          camera.scrollX -= drag1Vector.x / camera.zoom;
          camera.scrollY -= drag1Vector.y / camera.zoom;
      })
      .on('pinch', function (pinch) {
          var scaleFactor = pinch.scaleFactor;
          camera.zoom *= scaleFactor;
      }, this)

      // .setInteractive()
      // .on('pointerdown', (pointer) => {
      //   this.target.x = pointer.x;
      //   this.target.y = pointer.y;
        
      //   // Move at 200 px/s:
      //   this.physics.moveToObject(this.spaceship, this.target, 120);

      //   const rad = Phaser.Math.Angle.Between(this.spaceship.x, this.spaceship.y, this.target.x, this.target.y);
      //   this.spaceship.setAngle(Phaser.Math.RadToDeg(rad) + 90);
      // });

    this.space.displayWidth = this.sys.canvas.width;
    this.space.displayHeight = this.sys.canvas.height;


    for (let index = 0; index < this.shipCount; index++) {
      const {x, y} = getRandomXY();
      const spaceship = this.physics.add.image(x, y, 'spaceship').setScale(0.06);
      this.ships.push({ship: spaceship, target: {x, y}});
    }

    // setTimeout(() => {
    //   camera.startFollow(this.ships[0].ship)
    // }, 2000)

    // new PhaserLogo(this, this.cameras.main.width / 2, 0)

    // // display the Phaser.VERSION
    // this.add
    //   .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
    //     color: '#000000',
    //     fontSize: '24px'
    //   })
    //   .setOrigin(1, 0)

    this.fpsText = this.add.text(0, 0, 'Loading...', {});

    this.scene.launch('TestScene')
  }

  update() {
    this.fpsText.setText(`fps: ${Math.floor(this.game.loop.actualFps)}`)
    
    for (let index = 0; index < this.shipCount; index++) {
      const {ship, target} = this.ships[index];

      if (ship.body.speed > 0) {
        const distance = Phaser.Math.Distance.Between(ship.x, ship.y, target.x, target.y);
     
        if (distance < 4)
        {
          ship.body.reset(target.x, target.y);
        }
      } else {
        const targetXY = getRandomXY();
        const rad = Phaser.Math.Angle.Between(ship.x, ship.y, targetXY.x, targetXY.y);

        this.ships[index].target = targetXY;

        ship.setAngle(Phaser.Math.RadToDeg(rad) + 90);
        this.physics.moveToObject(ship, targetXY, 50);
      }
    }

    // if (this.spaceship.body.speed > 0)
    // {
    //   const distance = Phaser.Math.Distance.Between(this.spaceship.x, this.spaceship.y, this.target.x, this.target.y);
    //     //  4 is our distance tolerance, i.e. how close the source can get to the target
    //     //  before it is considered as being there. The faster it moves, the more tolerance is required.
    //     if (distance < 4)
    //     {
    //       // console.log(Phaser.Math.Angle.Between(this.spaceship.x, this.spaceship.y, this.target.x, this.target.y));
    //         this.spaceship.body.reset(this.target.x, this.target.y);
    //     }
    // }

    // this.spaceship.x += 2

    // if(this.spaceship.x > this.cameras.main.width) {
    //   this.spaceship.x = 0
    // }
  }
}
