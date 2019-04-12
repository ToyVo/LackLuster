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
		this.player = new Player(this, spawnPoint.x, spawnPoint.y, 'player_front');
		this.gameCamera.startFollow(this.player, false, 0.5, 0.5);
		this.physics.add.collider(this.player, botWalls);

		// Pause Game
		this.input.gamepad.on('up', function (pad, button, value) {
			if (button.index === 1) {
				this.scene.run('PauseScene', 'Level1');
				this.scene.bringToTop('PauseScene');
				this.scene.pause('Level1');
			}
		}, this);
		this.input.keyboard.on('keyup-ESC', function (event) {
			this.scene.run('PauseScene', 'Level1');
			this.scene.bringToTop('PauseScene');
			this.scene.pause('Level1');
		}, this);

		// Bring the debug draw layer to the top
		if (__DEV__) {
			this.debugDraw.bringToTop();
		}
	}

	update (time, delta) {
		this.input.update();
		this.player.update(time, delta);
	}
}
