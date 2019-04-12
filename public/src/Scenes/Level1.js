/* global Player */
/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "Level1" }] */

class Level1 extends Phaser.Scene {
	preload () {
		setupAnimations(this);
	}

	create () {
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
			// enemySpawn.body.setScale(3);
			this.slimeGroup.add(enemySpawn[i]);
			this.physics.add.existing(enemySpawn[i]);
		}

		// this.anims.play('slimeAnim', enemySpawn);enemyColl

		function triggerHubTransition () {
			this.scene.start('GameScene');
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
		// Player
		let playerContainer = this.add.container(0, 0);
		this.friendSLime = this.add.sprite(spawnPoint.x + 20, spawnPoint.y + 20, 'slime_black_walking');
		this.friendSLime2 = this.add.sprite(spawnPoint.x + 20, spawnPoint.y + 20, 'slime_black_walking');
		this.friendSLime3 = this.add.sprite(spawnPoint.x + 20, spawnPoint.y + 20, 'slime_black_walking');
		this.player = new Player(this, spawnPoint.x, spawnPoint.y, 'player_front');
		this.gameCamera.startFollow(this.player, false, 0.5, 0.5);
		playerContainer.add(this.player);
		playerContainer.add(this.friendSLime);
		playerContainer.add(this.friendSLime2);
		playerContainer.add(this.friendSLime3);

		this.physics.add.collider(this.player, botWalls);
		this.physics.add.collider(this.player, this.slimeGroup.getChildren(), this.player.takeDamage, null, this.player);
		this.physics.add.collider(botWalls, this.slimeGroup.getChildren(), slimeMove, null, this);
		this.physics.add.collider(enemyColl, this.slimeGroup.getChildren()); // Contains the slimes
		this.physics.add.collider(topWalls, this.slimeGroup.getChildren(), slimeMove, null, this); // Contains the slimes
		Phaser.Actions.Call(this.slimeGroup.getChildren(), function (child) {
			child.body.setVelocityX(-100); // ACTUALLY WORKS YES, Appears to be a one time method call
			child.setScale(2);
			// child.setDepth(-1);
		}); // so we get no weird overriding -100 velocityX in our update
	}

	update (time, delta) {
		this.input.update();
		if (this.player.health === 3) {
			this.friendSLime3.visible = true;
			this.friendSLime2.visible = true;
			this.friendSLime.visible = true;
		} else if (this.player.health === 2) {
			this.friendSLime3.visible = false;
			this.friendSLime2.visible = true;
			this.friendSLime.visible = true;
		} else if (this.player.health === 1) {
			this.friendSLime3.visible = false;
			this.friendSLime2.visible = false;
			this.friendSLime.visible = true;
		}
		this.friendSLime.x = this.player.body.x + 50;
		this.friendSLime.y = this.player.body.y - 20;
		this.friendSLime2.x = this.player.body.x + 110;
		this.friendSLime2.y = this.player.body.y + 20;
		this.friendSLime3.x = this.player.body.x - 30;
		this.friendSLime3.y = this.player.body.y + 20;

		this.player.update(time, delta);
	}
}
