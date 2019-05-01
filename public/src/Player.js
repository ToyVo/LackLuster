/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "(Player)" }] */
/* global game */
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
		this.setOrigin(0.5, 0.5);
		this.setScale(5); // Lil smaller so we can fit him everywhere
		this.body.setCollideWorldBounds(true);
		this.body.onWorldBounds = true;
		this.body.setSize(14, 10);// Adjusting y value on the collider
		this.body.setOffset(0, 14);
		this.setDepth(10);
		this.anims.play('player_walk_front_anim');

		this.playerHurt = game.sound.add('playerH', {
			volume: 0.8, rate: 1, loop: false
		});
		this.playerDeath = game.sound.add('playerD', {
			volume: 0.7, rate: 1.3, loop: false
		});
		this.footsteps = game.sound.add('walk', {
			volume: 0.05, rate: 1.25, loop: false
		});
		this.dashDash = game.sound.add('dash', {
			volume: 0.3, rate: 1, loop: false
		});
		this.damageCooldown = 0;
		this.health = 6;

		this.velocity = 600;
		this.rollCooldown = 50;

		this.healthCenter = this.scene.add.sprite(x, y, 'health_orb').setScale(4, 4).setDepth(100);
		this.healthRight = this.scene.add.sprite(x, y, 'health_orb').setScale(4, 4).setDepth(100);
		this.healthLeft = this.scene.add.sprite(x, y, 'health_orb').setScale(4, 4).setDepth(100);

		this.lastDirection = 'down';
		this.lastTexture = 'player_front';
		this.lastAnim = 'player_walk_front_anim';
		this.lastDashAnim = 'playerDashDown';
	}

	update (time, delta) {
		// this.velocity = 600;
		this.body.setVelocity(0);
		this.body.setAcceleration(0);

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
		let gamepad = null;

		if (this.scene.input.gamepad.total !== 0) {
			gamepad = this.scene.input.gamepad.getPad(0);
		}

		if (gamepad != null) {
			input = {
				left: keys.left.isDown || keys.a.isDown || gamepad.leftStick.x === -1, // analog stick left
				right: keys.right.isDown || keys.d.isDown || gamepad.leftStick.x === 1, // analog stick right
				down: keys.down.isDown || keys.s.isDown || gamepad.leftStick.y === 1, // analog stick down
				up: keys.up.isDown || keys.w.isDown || gamepad.leftStick.y === -1, // analog stick up
				space: keys.space.isDown || gamepad.buttons[0].pressed // left button, right button is index 1
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

		if (input.left) {
			if (!this.footsteps.isPlaying) {
				this.footsteps.play();
			}
			this.body.setVelocityX(-this.velocity);
			this.lastDirection = 'left';
		} else if (input.right) {
			if (!this.footsteps.isPlaying) {
				this.footsteps.play();
			}
			this.body.setVelocityX(this.velocity);
			this.lastDirection = 'right';
		}

		if (input.up) {
			if (!this.footsteps.isPlaying) {
				this.footsteps.play();
			}
			this.body.setVelocityY(-this.velocity);
			this.lastDirection = 'up';
		} else if (input.down) {
			if (!this.footsteps.isPlaying) {
				this.footsteps.play();
			}
			this.body.setVelocityY(this.velocity);
			this.lastDirection = 'down';
		}

		if (input.up || input.down || input.left || input.right) {
			let anim = null;
			let dashAnim = null;
			switch (this.lastDirection) {
			case 'up':
				anim = 'player_walk_back_anim';
				dashAnim = 'playerDashUp';
				break;
			case 'down':
				anim = 'player_walk_front_anim';
				dashAnim = 'playerDashDown';
				break;
			case 'left':
				anim = 'player_walk_left_anim';
				dashAnim = 'playerDashLeft';
				break;
			case 'right':
				anim = 'player_walk_right_anim';
				dashAnim = 'playerDashRight';
				break;
			}
			if (anim !== this.lastAnim || !this.anims.isPlaying) {
				this.lastAnim = anim;
				this.lastDashAnim = dashAnim;
				this.anims.play(anim);
			}
		} else {
			this.anims.stop();
			this.footsteps.stop();
			let texture = null;
			switch (this.lastDirection) {
			case 'up':
				texture = 'player_back';
				break;
			case 'down':
				texture = 'player_front';
				break;
			case 'left':
				texture = 'player_left';
				break;
			case 'right':
				texture = 'player_right';
				break;
			}
			this.lastTexture = texture;
			this.setTexture(texture);
		}

		this.rollCooldown -= delta;
		if (input.space && this.rollCooldown <= 0 && (!this.body.blocked.up && !this.body.blocked.down &&
			!this.body.blocked.left && !this.body.blocked.right && !this.body.touching.up &&
			!this.body.touching.down && !this.body.touching.left && !this.body.touching.right)) {
			this.velocity = 600;
			this.body.setVelocity((this.body.velocity.x) * 5, this.body.velocity.y * 5);
			this.rollCooldown = 500;
			this.dashDash.play();
			this.anims.play(this.lastDashAnim);
		}

		this.damageCooldown -= delta;
		if (this.damageCooldown > 500) {
			this.velocity = -850;// Will simulate knockback to player
		}
		if (this.damageCooldown <= 500) {
			this.velocity = 600; // Will reset move to normal
		}
		this.healthCenter.x = this.body.x + 35;
		this.healthCenter.y = this.body.y - 100;
		this.healthRight.x = this.body.x + 80;
		this.healthRight.y = this.body.y - 60;
		this.healthLeft.x = this.body.x - 10;
		this.healthLeft.y = this.body.y - 60;
		switch (this.health) {
		case 6:
			this.healthCenter.tint = 0xffffff;
			this.healthCenter.visible = true;
			this.healthRight.visible = true;
			this.healthRight.tint = 0xffffff;
			this.healthLeft.visible = true;
			this.healthLeft.tint = 0xffffff;
			break;
		case 5:
			this.healthRight.tint = 800 * 0xffffff;
			break;
		case 4:
			this.healthCenter.visible = true;
			this.healthRight.visible = false;
			this.healthLeft.visible = true;
			break;
		case 3:
			this.healthCenter.tint = 800 * 0xffffff;
			break;
		case 2:
			this.healthCenter.visible = false;
			this.healthRight.visible = false;
			this.healthLeft.visible = true;
			break;
		case 1:
			this.healthLeft.tint = 800 * 0xffffff;
			break;
		case 0:
			this.healthCenter.visible = false;
			this.healthRight.visible = false;
			this.healthLeft.visible = false;
			break;
		}
	}

	takeDamage () {
		this.tint = 0xffffff;// Will reset player color from damage
		// the context of this function is on player, please don't switch it back to being the scene so that we have to do this.player on everything
		if (this.damageCooldown < 0) {
			if (!this.playerHurt.isPlaying === true) {
				this.playerHurt.play();
			}
			this.scene.cameras.main.shake(50, 0.005);
			this.health--;// We need to do this.player.body as the context of this changes below
			this.damageCooldown = 1000;
			for (let i = 0; i < 10; i++) { // Loop the color for an extra visual effect
				this.tint = Math.random() * 0xffffff;
			}
		}

		if (this.health <= 0) {
			this.playerDeath.play();
			this.scene.scene.run('GameOver');
			this.scene.scene.bringToTop('GameOver');
			this.scene.scene.pause('GameScene');
		}
		this.tint = 0xffffff;// Will reset player color from damage
	}
}
