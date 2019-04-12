/* global Player */
class GameScene extends Phaser.Scene {
	// Pre-load function: queues all needed assets for downloading
	// (they are actually downloaded asynchronously, prior to 'create')
	preload () {
		setupAnimations(this);
	}

	// Run after all loading (queued in preload) is finished
	create () {
		let theme = this.game.sound.add('mainTheme', {
			volume: 0.4, rate: 1, loop: true
		});

		const map = this.make.tilemap({ key: 'map' });
		let tileSetImg = map.addTilesetImage('LL_tiled_tiles', 'LL_tiled_tiles');
		let grass = map.createStaticLayer(0, tileSetImg, 0, 0);
		let tiles = map.createStaticLayer(1, tileSetImg, 0, 0);
		let walls = map.createStaticLayer(2, tileSetImg, 0, 0);
		let wallTop = map.createStaticLayer(3, tileSetImg, 0, 0);
		wallTop.setDepth(10);
		// let transitions = map.createStaticLayer(3, tileSetImg, 0, 0);
		// transitions.setTileIndexCallback(0, triggerLevelOne, this);
		// transitions.setTileIndexCallback(1, triggerMusic, this);
		walls.setTileLocationCallback(105, 30, 3, 3, triggerLevelOne, this);
		// walls.setTileLocationCallback(30, 100, 3, 3, triggerLevelTwo, this);
		// walls.setTileLocationCallback(177, 100, 3, 3, triggerLevelThree, this);
		walls.setTileLocationCallback(105, 175, 3, 3, triggerMusic, this);
		walls.setCollisionByProperty({ collides: true });
		const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');

		// Camera
		this.gameCamera = this.cameras.main;
		this.gameCamera.setBackgroundColor('#536b5d');
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);
		console.log('Width:' + map.widthInPixels + 'Height: ' + map.heightInPixels);
		// gamepad
		this.gamepad = null;
		this.input.gamepad.once('down', function (pad, button, index) {
			this.gamepad = pad;
		});

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

		// Pillars
		this.pillarGroup = this.physics.add.group({ key: 'pillarCollide', frameQuantity: 350 });
		this.pillarGroup.children.iterate(function (child) {
			child.setImmovable(true);
			child.setScale(3);
		});
		let circle = new Phaser.Geom.Circle(4800, 2600, 4800);
		Phaser.Actions.RandomCircle(this.pillarGroup.getChildren(), circle);

		// Collisions
		this.physics.add.collider(this.player, walls);
		// this.physics.add.collider(this.player, transitions); // How we transition player to level 1
		// this.physics.add.collider(this.player, this.pillarGroup.getChildren(), this.player.takeDamage, null, this.player);
		// Pause Game
		this.input.gamepad.on('up', function (pad, button, value) {
			if (button.index === 1) {
				this.scene.run('PauseScene');
				this.scene.bringToTop('PauseScene');
				this.scene.pause('GameScene');
			}
		}, this);
		this.input.keyboard.on('keyup-ESC', function (event) {
			this.scene.run('PauseScene');
			this.scene.bringToTop('PauseScene');
			this.scene.pause('GameScene');
		}, this);

		// Bring the debug draw layer to the top
		if (__DEV__) {
			this.debugDraw.bringToTop();
		}

		function triggerMusic () {
			// walls.destroy();
			theme.play();
		}

		function triggerLevelOne () {
			this.scene.start('Level1');
		}
		function triggerLevelTwo () {
			this.scene.start('Level2');
		}
		function triggerLevelThree () {
			this.scene.start('Level3');
		}
	} // End create func

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

		// Behold the terrifying moving pillars of DOOM, must be in update
		// or they will not follow the playeres new X,Y position as they
		// move about in the world
		Phaser.Actions.Call(this.pillarGroup.getChildren(), function (child) {
			this.physics.moveToObject(child, this.player, 20);
		}, this);
	}
}
// Ensure this is a globally accessible class
window.GameScene = GameScene;
