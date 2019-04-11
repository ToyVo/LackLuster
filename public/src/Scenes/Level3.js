/* global Player */
/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "Level3" }] */

class Level3 extends Phaser.Scene {
	preload () {
		setupAnimations(this);
	}

	create () {
		let map = this.make.tilemap({ key: 'Level3' });
		let tileSetImg = map.addTilesetImage('LL_tiled_tiles', 'LL_tiled_tiles');
		// We dont add the transition tileset as we *want* this to not render
		// This helps make invisible triggers, but keeps them visible in Tiled
		// for an easier time
		let tiles = map.createStaticLayer(0, tileSetImg);
		let topWalls = map.createStaticLayer(1, tileSetImg);
		let botWalls = map.createStaticLayer(2, tileSetImg);
		botWalls.setCollisionByProperty({ collides: true });
		const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');
		// Camera
		this.gameCamera = this.cameras.main;
		this.gameCamera.setBackgroundColor('#536b5d');
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
