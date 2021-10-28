import { GameResizeEvent, WORLD_HEIGHT, WORLD_WIDTH } from '../game';
interface ShipObject {
  ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  target: { x: number; y: number };
}

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }

export default class MainScene extends Phaser.Scene {
  fpsText;
  spaceship;
  space;
  target = new Phaser.Math.Vector2();
  shipCount = 10;
  ships: ShipObject[] = [];
  ship;
  canvas;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.canvas = this.sys.game.canvas;

    this.load.image('spaceship', 'assets/img/spaceship.png');
    this.load.image('space', 'assets/img/testbild.jpg');
    // this.load.image('space', 'assets/img/space.jpg');
  }

  resize({ detail }: CustomEvent<GameResizeEvent>) {
    console.log(
      'resize physics world bounds',
      this.physics.world.bounds.centerX,
      this.physics.world.bounds.centerY,
    );
    console.log('resize main', detail);
    // const { width, height } = detail;

    // this.cameras.resize(window.innerWidth, window.innerHeight);

    // this.space.x = width / 2;
    // this.space.y = height / 2;
    // this.space.setSize(window.innerWidth, window.innerHeight);

    //   const screen = new ScreenSizeDetector();
    //   // const width = window.innerWidth; //gameSize.width;
    //   // const height = window.innerHeight; //gameSize.height;

    //   // setTimeout(() => {
    //   //   this.cameras.resize(width, height);

    //   //   this.space.setSize(width, height);
    //   //   this.space.displayWidth = width;
    //   //   this.space.displayHeight = height;
    //   // }, 1000);
    //   // this.logo.setPosition(width / 2, height / 2);
  }

  // checkOriention(orientation) {
  //   if (orientation === Phaser.Scale.PORTRAIT) {
  //     console.log('orientation portrait', orientation);
  //     // ship.alpha = 0.2;
  //     // text.setVisible(true);
  //   } else if (orientation === Phaser.Scale.LANDSCAPE) {
  //     console.log('orientation landscape', orientation);
  //     // ship.alpha = 1;
  //     // text.setVisible(false);
  //   }
  // }

  create() {
    console.log('mainScene create');

    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.centerOn(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    console.log('physics', this);
    console.log('physics world bounds', this.physics.world.bounds.centerX, this.physics.world.bounds.centerY);
    console.log('cameras.main', this.cameras.main);

    import(/* webpackChunkName: "testScene" */ './testScene').then((testScene) => {
      this.scene.add('TestScene', testScene.default, true);
    });

    import(/* webpackChunkName: "debugScene" */ './debugScene').then((debugScene) => {
      this.scene.add('DebugScene', debugScene.default, true);
    });

    this.space = this.add.image(0, 0, 'space').setOrigin(0);

    const shipX = this.physics.world.bounds.centerX;
    const shipY = this.physics.world.bounds.centerY;
    this.ship = this.physics.add.image(shipX, shipY, 'spaceship').setScale(0.6).setOrigin(0.5);

    // this.cameras.main.setPosition(WORLD_HEIGHT / 2, WORLD_WIDTH / 2);

    const camera = this.cameras.main;
    // const camera2 = this.cameras.scene.
    this.input.on('wheel', (pointer, dx, dy, dz) => {
      console.log(dx, dy, dz);

      if (dz > 0) {
        const newZoom = camera.zoom - 0.003;
        console.log(newZoom);

        if (newZoom >= 1) {
          camera.zoom = newZoom;
        }
      }

      if (dz < 0) {
        const newZoom = camera.zoom + 0.003;
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
      .on('drag1', ({ drag1Vector }: any) => {
        const newX = camera.scrollX - drag1Vector.x / camera.zoom;
        const newY = camera.scrollY - drag1Vector.y / camera.zoom;

        if (newX >= 0) {
          camera.scrollX = newX;
        }

        if (newY >= 0) {
          camera.scrollY = newY;
        }

        console.log('drag1Vector', drag1Vector, camera.scrollX, camera.scrollY);
      })
      .on(
        'pinch',
        function ({ scaleFactor }: any) {
          camera.zoom *= scaleFactor;
        },
        this,
      );

    window.addEventListener('game-resize', ((event: CustomEvent) => this.resize(event)) as EventListener);

    this.scene.launch('TestScene');
  }

  update() {
    // for (let index = 0; index < this.shipCount; index++) {
    //   const { ship, target } = this.ships[index];
    //   if (ship.body.speed > 0) {
    //     const distance = Phaser.Math.Distance.Between(ship.x, ship.y, target.x, target.y);
    //     if (distance < 4) {
    //       ship.body.reset(target.x, target.y);
    //     }
    //   } else {
    //     const targetXY = getRandomXY();
    //     const rad = Phaser.Math.Angle.Between(ship.x, ship.y, targetXY.x, targetXY.y);
    //     this.ships[index].target = targetXY;
    //     ship.setAngle(Phaser.Math.RadToDeg(rad) + 90);
    //     this.physics.moveToObject(ship, targetXY, getRandomInt(12, 40));
    //   }
    // }
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
