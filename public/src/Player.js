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

    this.rollCooldown = 0;
  }

  update (keys, time, delta) {
    this.body.setAcceleration(0, 0);
    this.body.setDrag(350, 350);

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
      this.body.setAcceleration(10000);
      this.body.setDrag(1500, 1500);
      this.rollCooldown = 300;
    }
  }
}
