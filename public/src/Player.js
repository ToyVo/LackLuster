/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "(Player)" }] */
/**
 * Main player class used in game
 *
 */
class Player extends Phaser.GameObjects.Sprite {
	/**
	 * player constuctor
	 * @param {Phaser.Game.scene} scene scene this object exists in (this)
	 * @param {Number} x x Location
	 * @param {Number} y y Location
	 * @param {String} texture texture key
	 */
	constructor (scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.physics.world.enable(this);
		scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		// this.body.onWorldBounds = true;

		// this.anims.play('front');

		this.acceleration = 600;
		this.body.setMaxSpeed(700);

		this.damageCooldown = 0;
		this.health = 3;

		this.rollCooldown = 50;
		this.setScale(6, 6);
	}

	update (gamepad, time, delta) {
		this.body.setAcceleration(0, 0);
		this.body.setDrag(500, 500);

		// key inputs
		let keys = {
			up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
			down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
			left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
			right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
			w: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			a: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			s: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			d: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
			space: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
		};

		let input = null;

		if (gamepad) {
			console.log('gamepad connected');
			input = {
				left: keys.left.isDown || keys.a.isDown,
				right: keys.right.isDown || keys.d.isDown,
				down: keys.down.isDown || keys.s.isDown,
				up: keys.up.isDown || keys.w.isDown,
				space: keys.space.isDown
			};
		} else {
			input = {
				left: keys.left.isDown || keys.a.isDown,
				right: keys.right.isDown || keys.d.isDown,
				down: keys.down.isDown || keys.s.isDown,
				up: keys.up.isDown || keys.w.isDown,
				space: keys.space.isDown
			};
		}

		let anim = null;

		if (input.left) {
			this.body.setAccelerationX(-this.acceleration);
			this.setTexture('player_left');
		} else if (input.right) {
			this.body.setAccelerationX(this.acceleration);
			this.setTexture('player_right');
		}

		if (input.up) {
			this.body.setAccelerationY(-this.acceleration);
			this.setTexture('player_back');
		} else if (input.down) {
			this.body.setAccelerationY(this.acceleration);
			anim = 'player_walk_front_anim';
			this.setTexture('player_front');
		}

		// if (this.anims.currentAnim.key !== anim && !this.scene.physics.world.isPaused) {
		// this.anims.play(anim);
		// }

		this.rollCooldown -= delta;

		if (input.space && this.rollCooldown <= 0) {
			this.body.setAcceleration(this.body.acceleration.x * 100, this.body.acceleration.y * 100);
			this.body.setDrag(1500, 1500);
			this.rollCooldown = 500;
		}

		this.damageCooldown -= delta;
	}

	takeDamage () {
		// the context of this function is on player, please don't switch it back to being the scene so that we have to do this.player on everything
		console.log('player health:' + this.health);
		this.body.setAcceleration(this.body.acceleration.x * -100, this.body.acceleration.y * -100);
		this.tint = Math.random() * 0xffffff;
		this.tint = Math.random() * 0xffffff;
		this.tint = Math.random() * 0xffffff;
		this.tint = Math.random() * 0xffffff;
		this.tint = Math.random() * 0xffffff;
		// this.player.tint = 0xffffff;
		if (this.damageCooldown < 0) {
			this.scene.gameCamera.shake(50, 0.005);
			this.health--;// We need to do this.player.body as the context of this changes below
			this.damageCooldown = 1000;
		}

		if (this.health <= 0) {
			console.log('player dead');
			this.scene.scene.start('GameOver');
		}
	}
}
