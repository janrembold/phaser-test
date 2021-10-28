import { WORLD_HEIGHT, WORLD_WIDTH } from '../game';
import { getRandomInt, getRandomWorldPosition } from '../utils/random';
interface ShipObject {
  ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  target: { x: number; y: number };
}

const SHIP_COUNT = 10;

export default class MainScene extends Phaser.Scene {
  space;
  ships: ShipObject[] = [];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('spaceship', 'assets/img/spaceship.png');
    this.load.image('space', 'assets/img/testbild.jpg');
    this.load.image('bg', 'assets/img/space_bg.jpg');
  }

  create() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.centerOn(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.space = this.add.image(0, 0, 'bg').setOrigin(0);

    this.addShips();
    this.addScrolling();

    // window.addEventListener('game-resize', ((event: CustomEvent) => this.resize(event)) as EventListener);
    this.loadLayers();
  }

  update() {
    for (let index = 0; index < SHIP_COUNT; index++) {
      const { ship, target } = this.ships[index];

      if (ship.body.speed > 0) {
        const distance = Phaser.Math.Distance.Between(ship.x, ship.y, target.x, target.y);

        if (distance < 4) {
          ship.body.reset(target.x, target.y);
        }
      } else {
        const targetXY = getRandomWorldPosition();
        const rad = Phaser.Math.Angle.Between(ship.x, ship.y, targetXY.x, targetXY.y);
        
        this.ships[index].target = targetXY;
        ship.setAngle(Phaser.Math.RadToDeg(rad) + 90);
        this.physics.moveToObject(ship, targetXY, getRandomInt(12, 40));
      }
    }
    // if (this.spaceship.body.speed > 0) {
    //   const distance = Phaser.Math.Distance.Between(
    //     this.spaceship.x,
    //     this.spaceship.y,
    //     this.target.x,
    //     this.target.y,
    //   );
    //   //  4 is our distance tolerance, i.e. how close the source can get to the target
    //   //  before it is considered as being there. The faster it moves, the more tolerance is required.
    //   if (distance < 4) {
    //     // console.log(Phaser.Math.Angle.Between(this.spaceship.x, this.spaceship.y, this.target.x, this.target.y));
    //     this.spaceship.body.reset(this.target.x, this.target.y);
    //   }
    // }
    // this.spaceship.x += 2
    // if(this.spaceship.x > this.cameras.main.width) {
    //   this.spaceship.x = 0
    // }
  }

  loadLayers() {
    import(/* webpackChunkName: "testScene" */ './testScene').then((testScene) => {
      this.scene.add('TestScene', testScene.default, true);
    });

    import(/* webpackChunkName: "debugScene" */ './debugScene').then((debugScene) => {
      this.scene.add('DebugScene', debugScene.default, true);
    });

    // this.scene.launch('TestScene');
  }

  addShips() {
    for (let index = 0; index < SHIP_COUNT; index++) {
      const { x, y } = getRandomWorldPosition();
      const spaceship = this.physics.add.image(x, y, 'spaceship').setScale(0.06).setOrigin(0.5);
      this.ships.push({ ship: spaceship, target: { x, y } });
    }
  }

  addScrolling() {
    const camera = this.cameras.main;
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
  }
}
