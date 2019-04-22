/* global Player setupAnimations */
class GameScene extends Phaser.Scene {
	// Pre-load function: queues all needed assets for downloading
	// (they are actually downloaded asynchronously, prior to 'create')
	preload () {
		setupAnimations(this);
	}

	// Run after all loading (queued in preload) is finished
	create () {
		this.theme = this.game.sound.add('mainTheme', {
			volume: 0.4, rate: 1, loop: true
		});

		const map = this.make.tilemap({ key: 'map' });
		let tileSetImg = map.addTilesetImage('LL_tiled_tiles', 'LL_tiled_tiles');
		let grass = map.createStaticLayer(0, tileSetImg, 0, 0);
		let tiles = map.createStaticLayer(1, tileSetImg, 0, 0);
		let walls = map.createStaticLayer(2, tileSetImg, 0, 0);
		let wallTop = map.createStaticLayer(3, tileSetImg, 0, 0).setDepth(10);
		walls.setTileLocationCallback(105, 30, 3, 3, this.triggerLevelOne, this);
		walls.setTileLocationCallback(105, 175, 3, 3, this.triggerMusic, this);
		walls.setCollisionByProperty({ collides: true });
		const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');

		// Camera
		this.cameras.main.setBackgroundColor('#536b5d');
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);

		// Player
		this.player = new Player(this, spawnPoint.x, spawnPoint.y, 'player_front');
		this.cameras.main.startFollow(this.player, false, 0.5, 0.5);

		// Collisions
		this.physics.add.collider(this.player, walls);

		// Pause Game
		this.input.gamepad.on('up', function (pad, button, value) {
			if (button.index === 1) {
				this.scene.run('PauseScene', 'GameScene');
				this.scene.bringToTop('PauseScene');
				this.scene.pause('GameScene');
			}
		}, this);
		this.input.keyboard.on('keyup-ESC', function (event) {
			this.scene.run('PauseScene', 'GameScene');
			this.scene.bringToTop('PauseScene');
			this.scene.pause('GameScene');
		}, this);

		// Bring the debug draw layer to the top
		if (__DEV__) {
			this.debugDraw.bringToTop();
		}
	} // End create func

	update (time, delta) {
		this.input.update();
		this.player.update(time, delta);
	}

	triggerMusic () {
		// walls.destroy();
		this.theme.play();
	}

	triggerLevelOne () {
		this.scene.start('Level1');
	}

	triggerLevelTwo () {
		this.scene.start('Level2');
	}

	triggerLevelThree () {
		this.scene.start('Level3');
	}
}
// Ensure this is a globally accessible class
window.GameScene = GameScene;
