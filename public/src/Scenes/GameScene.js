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
		let transitions = map.createStaticLayer(4, tileSetImg, 0, 0);
		transitions.setTileIndexCallback(0, triggerLevelOne, this);
		transitions.setTileIndexCallback(1, triggerMusic, this);
		transitions.setTileLocationCallback(105, 30, 3, 3, triggerLevelOne, this);
		// transitions.setTileLocationCallback(30, 100, 3, 3, triggerLevelTwo, this);
		// transitions.setTileLocationCallback(177, 100, 3, 3, triggerLevelThree, this);
		transitions.setTileLocationCallback(105, 175, 3, 3, triggerMusic, this);
		walls.setCollisionByProperty({ collides: true });
		const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');

		// Camera
		this.gameCamera = this.cameras.main;
		this.gameCamera.setBackgroundColor('#536b5d');
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);
		console.log('Width:' + map.widthInPixels + 'Height: ' + map.heightInPixels);

		/* // Enemy
		this.slimeGroup = this.physics.add.group({ key: 'slime_black_walking' });
		let enemySpawn = map.createFromObjects('Objects', 'EnemySpawn', { key: 'slime_black_walking' });
		for (var i = 0; i < enemySpawn.length; i++) {
			// enemySpawn.body.setScale(3);
			this.slimeGroup.add(enemySpawn[i]);
			this.physics.add.existing(enemySpawn[i]);
		}

		this.anims.play('slimeAnim', enemySpawn);
		// Only need to specify the object layers name, no need to create it
		// this.groundLayer = this.map.createLayer('Pillars');

		Phaser.Actions.Call(this.slimeGroup.getChildren(), function (child) {
			child.body.setVelocityX(-100); // ACTUALLY WORKS YES, Appears to be a one time method call
		}); // so we get no weird overriding -100 velocityX in our update */

		// Player
		this.player = new Player(this, spawnPoint.x, spawnPoint.y, 'player_front');
		this.gameCamera.startFollow(this.player, false, 0.5, 0.5);

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
		this.physics.add.collider(this.player, transitions); // How we transition player to level 1

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

		function triggerMusic () {
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
	} // End create func

	update (time, delta) {
		this.input.update();
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
