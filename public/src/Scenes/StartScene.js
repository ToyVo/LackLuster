/* global centerX, centerY, centerGameObjects */
class StartScene extends Phaser.Scene {
	// Run when the scene is first loaded
	init () {
		// Show message that the assets are loading
		this.loadingText = this.add.text(centerX(this), centerY(this),
			'Loading ...', { font: '16px Arial', fill: '#dddddd', align: 'center' });
		centerGameObjects([this.loadingText]);
	}

	preload () {
		this.load.image('LL_tile_01_6x', 'assets/sprites/LL_tile_01_6x.png');
		this.load.tilemapTiledJSON('Test3', 'assets/json/Test3.json');
		this.load.image('LL_pillar_01_6x', 'assets/sprites/LL_pillar_01_6x.png');
    this.load.spritesheet('slime_black_walking', 'assets/spritesheets/slime_walking_black.png', {frameWidth: 32, frameHeight: 32 });
 
		this.load.image('sky', 'assets/skies/space3.png');
		this.load.image('pillarCollide', 'assets/sprites/LL_pillar_example_01.png');

		/* Player AKA THICC SNACC */
		this.load.image('player_front', 'assets/player/player_front.png');
		this.load.image('player_right', 'assets/player/player_right.png');
		this.load.image('player_back', 'assets/player/player_back.png');
		this.load.image('player_left', 'assets/player/player_left.png');
		this.load.spritesheet('player_walk_front_sheet', 'assets/player/player_walk_front.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });

		/* Spritesheets Below */
		this.load.spritesheet('frameTest', 'assets/spritesheets/LL_4frame_tester.png', { frameWidth: 32, frameHeight: 32 });
		/* Animations */
		this.anims.create({
			key: 'player_walk_front_anim',
			frames: this.anims.generateFrameNumbers('player_walk_front_sheet', { start: 0, end: 12 }),
			frameRate: 12,
			repeat: -1
		});
	}

	create () {
		// Delete loading text
		this.loadingText.destroy();

		let gameHeight = this.sys.game.config.height;
		let gameWidth = this.sys.game.config.width;
		let title = this.add.text(gameWidth / 2, gameHeight / 4, 'Lack Luster', {
			font: '40px Arial',
			fill: '#FFFFFF'
		});
		title.setOrigin(0.5, 0.5);
		title.setDepth(1);

		let titleBg = this.add.graphics();
		titleBg.fillStyle(0x000000, 0.7);
		titleBg.fillRect(gameWidth / 2 - title.width / 2 - 10, gameHeight / 4 - title.height / 2 - 10, title.width + 20, title.height + 20);

		let start = this.add.text(gameWidth / 2, gameHeight / 2, 'Start', {
			font: '40px Arial',
			fill: '#FFFFFF'
		}).setInteractive();
		start.setOrigin(0.5, 0.5);
		start.setDepth(1);

		let startBg = this.add.graphics();
		startBg.fillStyle(0x000000, 0.7);
		startBg.fillRect(gameWidth / 2 - start.width / 2 - 10, gameHeight / 2 - start.height / 2 - 10, start.width + 20, start.height + 20);

		start.on('pointerup', function () {
			console.log('start game');
			this.scene.start('GameScene');
		}, this);
	}
}