/* global Player setupAnimations game */
/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "Level1" }] */

class Level1 extends Phaser.Scene {
	preload () {
		setupAnimations(this);
		this.boulderDeath = game.sound.add('BoulderD', {
			volume: 0.6, rate: 1, loop: false
		});
		this.spikeTrap = game.sound.add('spike', {
			volume: 0.3, rate: 1, loop: false
		});
	}

	create () {
		this.boulderCollide = false;
		let map = this.make.tilemap({ key: 'Level1' });
		let tileSetImg = map.addTilesetImage('LL_tiled_tiles', 'LL_tiled_tiles');
		// We dont add the transition tileset as we *want* this to not render
		// This helps make invisible triggers, but keeps them visible in Tiled
		// for an easier time
		let enemyColl = map.createStaticLayer(0, tileSetImg);
		let tiles = map.createStaticLayer(1, tileSetImg);
		let topWalls = map.createStaticLayer(2, tileSetImg);
		// topWalls.setDepth(10);
		let botWalls = map.createStaticLayer(3, tileSetImg);
		botWalls.setCollisionByProperty({ collides: true });
		topWalls.setCollisionByProperty({ collides: true });
		enemyColl.setCollisionByProperty({ collides: true });
		botWalls.setTileLocationCallback(90, 150, 100, 100, triggerHubTransition, this);
		botWalls.setTileLocationCallback(20, 105, 5, 5, letsRoll, this);
		const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');

		// Camera
		this.gameCamera = this.cameras.main;
		this.gameCamera.setBackgroundColor('#536b5d');
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);

		// Enemy
		this.slimeGroup = this.physics.add.group({ key: 'slime_black_walking' });
		let enemySpawn = map.createFromObjects('Objects', 'EnemySpawn', { key: 'slime_black_walking' });
		for (var i = 0; i < enemySpawn.length; i++) {
			this.slimeGroup.add(enemySpawn[i]);
			this.physics.add.existing(enemySpawn[i]);
		}

		this.trapGroup = this.physics.add.group({ key: 'spikeT' });
		let traps = map.createFromObjects('Objects', 'Trap', { key: 'spikeT' });
		for (var j = 0; j < traps.length; j++) {
			this.trapGroup.add(traps[j]);
			this.physics.add.existing(traps[j]);
		}
		this.boulderGroup = this.physics.add.group({ key: 'boul' });
		let boulder = map.createFromObjects('Objects', 'Boulder', { key: 'boul' });
		for (var k = 0; k < boulder.length; k++) {
			this.boulderGroup.add(boulder[k]);
			this.physics.add.existing(boulder[k]);
		}

		// this.anims.play('slimeAnim', enemySpawn);

		function triggerHubTransition () {
			this.scene.start('GameScene');
		}

		function letsRoll () {
			this.boulderGroup.children.iterate(function (child) {
				// this.anims.play('boulder_roll');
				child.body.setImmovable(true);
				child.body.velocity.x = 500;
				if (child.body.touching.right || child.body.blocked.right ||
					child.body.touching.left || child.body.blocked.left) {
					if (!this.boulderDeath.isPlaying) { this.boulderDeath.play(); }
					// this.anims.play('boulder_death');
					// this.on('animationcomplete', child.body.destroy(), this); // Only destroy IF animation is finished
					child.visible = false;
					child.body.destroy();
				}
			}, this); // so we get no weird overriding -100 velocityX in our update
		}

		function slimeMove () {
			this.slimeGroup.children.iterate(function (child) {
				child.body.setImmovable(true);
				if (child.body.touching.right || child.body.blocked.right) {
					child.body.velocity.y = 300;
					child.body.velocity.x = 0; // turn down
				} else if (child.body.touching.left || child.body.blocked.left) {
					child.body.velocity.y = -300; // turn up
					child.body.velocity.x = 0;
				} else if (child.body.touching.up || child.body.blocked.up) {
					child.body.velocity.y = 0;
					child.body.velocity.x = 300; // turn right
				} else if (child.body.touching.down || child.body.blocked.down) {
					child.body.velocity.y = 0;
					child.body.velocity.x = -300; // turn left
				}
			});
		}

		function triggerSpikes () {
			Phaser.Actions.Call(this.trapGroup.getChildren(), function (child) {
				if (!this.spikeTrap.isPlaying) { this.spikeTrap.play(); }
				child.anims.play('spikeTrapOn'); // WE split these to add a tiny delay in spike down
				child.anims.play('spikeTrapOff');
			}, this);
			this.player.takeDamage();
		}
		// Player
		this.player = new Player(this, spawnPoint.x, spawnPoint.y, 'player_front');
		this.gameCamera.startFollow(this.player, false, 0.5, 0.5);
		this.physics.add.collider(this.player, botWalls);

		// Pause Game
		this.input.gamepad.on('up', function (button) {
			if (button.index === 1) {
				this.scene.run('PauseScene', 'Level1');
				this.scene.bringToTop('PauseScene');
				this.scene.pause('Level1');
			}
		}, this);
		this.input.keyboard.on('keyup-ESC', function () {
			this.scene.run('PauseScene', 'Level1');
			this.scene.bringToTop('PauseScene');
			this.scene.pause('Level1');
		}, this);

		// Bring the debug draw layer to the top
		if (__DEV__) {
			this.debugDraw.bringToTop();
		}

		this.physics.add.collider(this.player, botWalls);
		this.physics.add.collider(this.player, this.slimeGroup.getChildren(), this.player.takeDamage, null, this.player);
		this.physics.add.overlap(this.player, this.trapGroup.getChildren(), triggerSpikes, null, this); // Want overlap
		this.physics.add.collider(this.player, this.boulderGroup.getChildren(), this.player.takeDamage, null, this.player);
		this.physics.add.collider(this.boulderGroup.getChildren(), botWalls);
		// this.physics.add.collider(this.boulderGroup.getChildren(), topWalls, this.boulderCollide = true);

		this.physics.add.collider(botWalls, this.slimeGroup.getChildren(), slimeMove, null, this);
		this.physics.add.collider(enemyColl, this.slimeGroup.getChildren()); // Contains the slimes
		this.physics.add.collider(topWalls, this.slimeGroup.getChildren(), slimeMove, null, this); // Contains the slimes
		Phaser.Actions.Call(this.slimeGroup.getChildren(), function (child) {
			child.body.setVelocityX(-300); // ACTUALLY WORKS YES, Appears to be a one time method call
			child.setScale(2);
		}); // so we get no weird overriding -100 velocityX in our update
		Phaser.Actions.Call(this.trapGroup.getChildren(), function (child) {
			child.body.setImmovable(true); // Spikes
			child.setScale(3);
		});
		Phaser.Actions.Call(this.boulderGroup.getChildren(), function (child) {
			child.setScale(5);
		});
	}

	update (time, delta) {
		this.input.update();
		this.player.update(time, delta);
	}
}
