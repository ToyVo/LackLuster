/* global Player game */

class GameScene extends Phaser.Scene {
	// Pre-load function: queues all needed assets for downloading
	// (they are actually downloaded asynchronously, prior to 'create')
	preload () {}

	// Run after all loading (queued in preload) is finished
	create () {
		// Camera
		this.gameCamera = this.cameras.main;
		this.gameCamera.setBackgroundColor('#434343');
		this.gameCamera.setViewport(0, 0, 1920, 1080);
		this.cameras.main.setBounds(0, 0, 4800, 2700, true);

		let map = this.make.tilemap({ key: 'Test3' });
		let tileSetImg = map.addTilesetImage('LL_tile_01_6x', 'LL_tile_01_6x');

		let backgroundlayer = map.createStaticLayer(0, [tileSetImg], 0, 0);
		// this.groundLayer = this.map.createLayer('Pillars');
		// Physics
		this.physics.world.setBounds(0, 0, 4800, 2700, true, true, true, true);

		// Player
		this.player = new Player(this, 150, 150, 'player_front');
		this.gameCamera.startFollow(this.player, false, 0.5, 0.5);

		// key inputs
		this.keys = {
			up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
			down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
			left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
			right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
			w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
			space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
		};

		let pillarGroup = this.physics.add.group({ key: 'pillarCollide', frameQuantity: 350 });
		pillarGroup.children.iterate(function (child) {
			child.setImmovable(true);
			child.setScale(3);
		});
		let circle = new Phaser.Geom.Circle(4800, 2600, 4800);
		Phaser.Actions.RandomCircle(pillarGroup.getChildren(), circle);

		// Context of this changes in the callback below, Beware!
		this.physics.add.collider(pillarGroup.getChildren(), this.player, this.player.takeDamage, null, this.player);
		this.physics.add.collider(this.player, backgroundlayer);
		backgroundlayer.setCollisionByProperty({ collides: true });

		// Pause Game
		this.input.keyboard.on('keyup_ESC', function (event) {
			this.scene.run('PauseScene');
			this.scene.bringToTop('PauseScene');
			this.scene.pause('GameScene');
		}, this);

		// Bring the debug draw layer to the top
		if (__DEV__) {
			this.debugDraw.bringToTop();
		}
	}

	update (time, delta) {
		this.player.update(this.keys, time, delta);
	}
}

// Ensure this is a globally accessible class
window.GameScene = GameScene;
