/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "(Player)" }] */
/**
 * Main player class used in game
 *
 */
class Player extends Phaser.GameObjects.Sprite {
	/**
	 * player constuctor
	 * @param {Phaser.Game.scene} scene scene this object exists in (this)
	 * @param {*} x x Location
	 * @param {*} y y Location
	 * @param {*} texture texture key
	 */
	constructor (scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.physics.world.enable(this);
		scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		// this.body.onWorldBounds = true;

    this.damaged = 0;
    this.health = 3;
   
    this.rollCooldown = 50;
  }

  update (keys, time, delta) {
    this.body.setAcceleration(0, 0);
    this.body.setDrag(350, 350);
    this.body.setMaxSpeed(700);

		let input = {
			left: keys.left.isDown || keys.a.isDown,
			right: keys.right.isDown || keys.d.isDown,
			down: keys.down.isDown || keys.s.isDown,
			up: keys.up.isDown || keys.w.isDown,
			space: keys.space.isDown
		};

		if (input.left) {
			this.body.setAccelerationX(-200);
		} else if (input.right) {
			this.body.setAccelerationX(200);
		}

		if (input.up) {
			this.body.setAccelerationY(-200);
		} else if (input.down) {
			this.body.setAccelerationY(200);
		}

		this.rollCooldown -= delta;

		if (input.space && this.rollCooldown <= 0) {
			this.body.setAcceleration(this.body.acceleration.x * 100, this.body.acceleration.y * 100);
			this.body.setDrag(1500, 1500);
			this.rollCooldown = 500;
		}

		this.damageCooldown -= delta;
	}

  takeDamage () {
    this.player.body.setAcceleration(this.player.body.acceleration.x * -100, this.player.body.acceleration.y*-100);
    this.player.tint = Math.random() * 0xffffff;
    this.player.tint = Math.random() * 0xffffff;
    this.player.tint = Math.random() * 0xffffff;
    this.player.tint = Math.random() * 0xffffff;
    this.player.tint = Math.random() * 0xffffff;
    //this.player.tint = 0xffffff;
    if (this.player.damaged < 0) {
      this.player.scene.gameCamera.shake(50, 0.005);
      this.player.health--;//We need to do this.player.body as the context of this changes below
      this.player.damaged = 1000;
    }

    if (this.player.health <= 0) { //In here load a game over scene/play player death/reset?
      //Proof we get in here, cool effect too
      this.scene.start('GameOver');
    }
  }
	/*takeDamage () {
		this.knockBack();
		if (this.damageCooldown < 0) {
			this.scene.gameCamera.shake(50, 0.005);
			this.health--;// We need to do this.player.body as the context of this changes below
			this.damageCooldown = 1000;
		}

		if (this.health <= 0) { // In here load a game over scene/play player death/reset?
			this.tint = Math.random() * 0xffffff;// Proof we get in here, cool effect too
			// this.scene.start('GameOver');
		}
	}

	knockBack () {
		this.body.setAcceleration(this.body.acceleration.x * -100, this.body.acceleration.y * -100);
		this.body.setDrag(1500, 1500);
	}*/
}
