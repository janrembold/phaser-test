import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText;
  spaceship;
  space;
  target = new Phaser.Math.Vector2();

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.fpsText = new FpsText(this)

    this.space = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'space').setInteractive()
      .on('pointerdown', (pointer) => {
        this.target.x = pointer.x;
        this.target.y = pointer.y;
        
        // Move at 200 px/s:
        this.physics.moveToObject(this.spaceship, this.target, 120);

        const rad = Phaser.Math.Angle.Between(this.spaceship.x, this.spaceship.y, this.target.x, this.target.y);
        this.spaceship.setAngle(Phaser.Math.RadToDeg(rad) + 90);
      });

    this.space.displayWidth = this.sys.canvas.width;
    this.space.displayHeight = this.sys.canvas.height;


    this.spaceship = this.physics.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'spaceship').setScale(0.1);

    // new PhaserLogo(this, this.cameras.main.width / 2, 0)

    // // display the Phaser.VERSION
    // this.add
    //   .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
    //     color: '#000000',
    //     fontSize: '24px'
    //   })
    //   .setOrigin(1, 0)
  }

  update() {
    this.fpsText.update();

    const distance = Phaser.Math.Distance.Between(this.spaceship.x, this.spaceship.y, this.target.x, this.target.y);

    if (this.spaceship.body.speed > 0)
    {
        //  4 is our distance tolerance, i.e. how close the source can get to the target
        //  before it is considered as being there. The faster it moves, the more tolerance is required.
        if (distance < 4)
        {
          // console.log(Phaser.Math.Angle.Between(this.spaceship.x, this.spaceship.y, this.target.x, this.target.y));
            this.spaceship.body.reset(this.target.x, this.target.y);
        }
    }

    // this.spaceship.x += 2

    // if(this.spaceship.x > this.cameras.main.width) {
    //   this.spaceship.x = 0
    // }
  }
}
