/* global Player */
/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "Level1" }] */

class Level1 extends Phaser.Scene {
	preload () {
		setupAnimations(this);
	}

	create () {
		let map = this.make.tilemap({ key: 'Level1' });
		let tileSetImg = map.addTilesetImage('LL_tiled_tiles', 'LL_tiled_tiles');
		let tiles = map.createStaticLayer(0, tileSetImg);
		let topWalls = map.createStaticLayer(1, tileSetImg);
		let botWalls = map.createStaticLayer(2, tileSetImg);
		botWalls.setCollisionByProperty({ collides: true });
		const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');

		// Camera
		this.gameCamera = this.cameras.main;
		this.gameCamera.setBackgroundColor('#536b5d');
		// this.gameCamera.setViewport(0, 0, 1920, 1080);
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);

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
	}

	update (time, delta) {
		this.input.update();

		this.player.update(time, delta);
	}
}
