/* global centerX, centerY, centerGameObjects */
/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "StartScene" }] */
class StartScene extends Phaser.Scene {
	// Run when the scene is first loaded
	init () {
		// Show message that the assets are loading
		this.loadingText = this.add.text(centerX(this), centerY(this),
			'Loading ...', { fontFamily: 'font1', fontSize: '16px', fill: '#dddddd', align: 'center' });
		centerGameObjects([this.loadingText]);
	}

	preload () {
		this.load.image('LL_tiled_tiles', 'assets/sprites/LL_tiled_tiles.png');
		this.load.image('LL_tiled_light_tiles', 'assets/sprites/LL_tiled_light_tiles.png');
		this.load.tilemapTiledJSON('map', 'assets/json/LL_base_map.json');
		// End Tiled Assets
		this.load.spritesheet('slime_black_walking', 'assets/spritesheets/slime_walking_black.png', { frameWidth: 32, frameHeight: 32 });
		// this.load.image('sky', 'assets/skies/space3.png');
		this.load.image('Tile', 'assets/sprites/Trap.png');
		this.load.image('boul', 'assets/sprites/boulder.png');
		this.load.image('health_orb', 'assets/sprites/health_orb.png');

		/* Player AKA THICC SNACC */
		this.load.image('player_front', 'assets/player/player_front.png');
		this.load.image('player_right', 'assets/player/player_right.png');
		this.load.image('player_back', 'assets/player/player_back.png');
		this.load.image('player_left', 'assets/player/player_left.png');
		this.load.spritesheet('player_walk_front_sheet', 'assets/player/player_walk_front.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });
		this.load.spritesheet('player_walk_back_sheet', 'assets/player/player_walk_back.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });
		this.load.spritesheet('player_walk_left_sheet', 'assets/player/player_walk_left.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });
		this.load.spritesheet('player_walk_right_sheet', 'assets/player/player_walk_right.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });
		this.load.spritesheet('player_dash_anim_down', 'assets/spritesheets/Dash_Down.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });
		this.load.spritesheet('player_dash_anim_up', 'assets/spritesheets/Dash_Up.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });
		this.load.spritesheet('player_dash_anim_left', 'assets/spritesheets/Dash_Left.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });
		this.load.spritesheet('player_dash_anim_right', 'assets/spritesheets/Dash_Right.png', { frameWidth: 14, frameHeight: 24, margin: 1, spacing: 2 });

		/* Misc Spritesheets Below */
		this.load.spritesheet('slime_black_walking', 'assets/spritesheets/slime_walking_black.png', { frameWidth: 32, frameHeight: 32, spacing: 1 });
		this.load.spritesheet('spikeT', 'assets/spritesheets/Spike.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('light_orb', 'assets/spritesheets/light_ORB.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('sparkle', 'assets/spritesheets/sparkle.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('final_orb_activation_sheet', 'assets/spritesheets/Orb_Activation.png', { frameWidth: 96, frameHeight: 128 });
		this.load.spritesheet('final_orb_idle_sheet', 'assets/spritesheets/Orb_Idle.png', { frameWidth: 96, frameHeight: 128 });
		this.load.spritesheet('boulderUp', 'assets/spritesheets/Boulder_Upwards.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('boulderDown', 'assets/spritesheets/Boulder_Downwards.png', { frameWidth: 32, frameHeight: 32 });

		/* Audio */
		this.load.audio('dash', 'assets/audio/dash.wav');
		this.load.audio('playerH', 'assets/audio/slimeHurt.wav');
		this.load.audio('mainTheme', 'assets/audio/mainTheme.wav');
		this.load.audio('spike', 'assets/audio/spike.wav');
		this.load.audio('playerD', 'assets/audio/pDeath.wav');
		this.load.audio('walk', 'assets/audio/footsteps.wav');
		this.load.audio('powerUp', 'assets/audio/pillarCollide.wav');
		this.load.audio('levelOne', 'assets/audio/Level1.wav');
		this.load.audio('levelTwo', 'assets/audio/Level2.wav');
		this.load.audio('levelThree', 'assets/audio/Level3.wav');
	}

	create () {
		// Delete loading text
		this.loadingText.destroy();

		let gameHeight = this.sys.game.config.height;
		let gameWidth = this.sys.game.config.width;
		let background = this.add.graphics();
		background.fillStyle(0x000000, 0.4);
		background.fillRect(0, 0, gameWidth, gameHeight);

		// Title
		let title = this.add.text(gameWidth / 2, gameHeight / 4, 'Lack Luster', {
			fontFamily: 'font1',
			fontSize: '80px',
			fill: '#FFFFFF'
		}).setOrigin(0.5, 0.5).setDepth(1);

		// Start Button(s)
		let start = this.add.text(gameWidth / 2, 3 * gameHeight / 4, 'START', {
			fontFamily: 'font1',
			fontSize: '30px',
			fill: '#FFFFFF'
		}).setInteractive().setOrigin(0.5, 0.5).setDepth(1);

		this.blinkTimer = 0;
		this.anyButton = this.add.text(start.x, start.y + 120, 'PRESS ANY BUTTON TO START', {
			fontFamily: 'font1',
			fontSize: '12px',
			fill: '#FFFFFF'
		}).setOrigin(0.5, 0.5);

		let leftX = start.x - 40;
		let leftY = start.y + 70;
		let leftButton = this.add.graphics({ fillStyle: { color: 0xFF0000 } }).fillCircle(leftX, leftY, 30);
		let leftButtonText = this.add.text(leftX, leftY, 'LEFT', {
			fontFamily: 'font1',
			fontSize: '12px',
			fill: '#FFFFFF'
		}).setOrigin(0.5, 0.5);

		let rightX = start.x + 40;
		let rightY = start.y + 70;
		let rightButton = this.add.graphics({ fillStyle: { color: 0x0000FF } }).fillCircle(rightX, rightY, 30);
		let rightButtonText = this.add.text(rightX, rightY, 'RIGHT', {
			fontFamily: 'font1',
			fontSize: '12px',
			fill: '#FFFFFF'
		}).setOrigin(0.5, 0.5);

		// Credits Button
		let credits = this.add.text(gameWidth / 3, 3 * gameHeight / 4, 'CREDITS', {
			fontFamily: 'font1',
			fontSize: '30px',
			fill: '#FFFFFF'
		}).setInteractive().setOrigin(0.5, 0.5).setDepth(1);

		// Controls Button
		let controls = this.add.text(2 * gameWidth / 3, 3 * gameHeight / 4, 'CONTROLS', {
			fontFamily: 'font1',
			fontSize: '30px',
			fill: '#FFFFFF'
		}).setInteractive().setOrigin(0.5, 0.5).setDepth(1);

		// Scene Switching
		start.on('pointerup', function () {
			this.scene.resume('GameScene');
			this.scene.stop('StartScene');
		}, this);

		this.input.gamepad.on('up', function () {
			this.scene.resume('GameScene');
			this.scene.stop('StartScene');
		}, this);

		this.scene.run('GameScene');
		this.scene.bringToTop('StartScene');
		this.scene.pause('GameScene');

		controls.on('pointerup', function () {
			this.scene.run('ControlsScene');
			this.scene.stop('StartScene');
		}, this);

		credits.on('pointerup', function () {
			this.scene.run('CreditsScene');
			this.scene.stop('StartScene');
		}, this);

		// Button highlighting
		start.on('pointerover', function () {
			start.tint = Math.random() * 0xffffff;
		}, this);
		start.on('pointerout', function () {
			start.clearTint();
		}, this);
		credits.on('pointerover', function () {
			credits.tint = Math.random() * 0xffffff;
		}, this);
		credits.on('pointerout', function () {
			credits.clearTint();
		}, this);
		controls.on('pointerover', function () {
			controls.tint = Math.random() * 0xffffff;
		}, this);
		controls.on('pointerout', function () {
			controls.clearTint();
		}, this);
	}

	update (time, delta) {
		this.input.update();
		this.blinkTimer += delta;
		if (this.blinkTimer >= 1000) {
			this.blinkTimer = 0;
			this.anyButton.visible = !this.anyButton.visible;
		}
	}
}
