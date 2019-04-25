/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "PauseScene" }] */
class PauseScene extends Phaser.Scene {
	create () {
		this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		let gameHeight = this.sys.game.config.height;
		let gameWidth = this.sys.game.config.width;
		let background = this.add.graphics();
		background.fillStyle(0x000000, 0.4);
		background.fillRect(0, 0, gameWidth, gameHeight);

		let resume = this.add.text(gameWidth / 3, 3 * gameHeight / 4, 'Resume', {
			fontFamily: 'font1',
			fill: '#FFFFFF'
		}).setInteractive().setOrigin(0.5, 0.5).setDepth(1);

		let quit = this.add.text(2 * gameWidth / 3, 3 * gameHeight / 4, 'Quit', {
			fontFamily: 'font1',
			fill: '#FFFFFF'
		}).setInteractive().setOrigin(0.5, 0.5).setDepth(1);

		let leftX = resume.x;
		let leftY = resume.y + 70;
		let leftButton = this.add.graphics({ fillStyle: { color: 0xFF0000 } }).fillCircle(leftX, leftY, 30);
		let leftButtonText = this.add.text(leftX, leftY, 'LEFT', {
			fontFamily: 'font1',
			fontSize: '12px',
			fill: '#FFFFFF'
		}).setOrigin(0.5, 0.5);

		let rightX = quit.x;
		let rightY = quit.y + 70;
		let rightButton = this.add.graphics({ fillStyle: { color: 0x0000FF } }).fillCircle(rightX, rightY, 30);
		let rightButtonText = this.add.text(rightX, rightY, 'RIGHT', {
			fontFamily: 'font1',
			fontSize: '12px',
			fill: '#FFFFFF'
		}).setOrigin(0.5, 0.5);

		// resume game
		resume.on('pointerup', function () {
			this.scene.resume('GameScene');
			this.scene.stop('PauseScene');
		}, this);

		this.input.gamepad.on('up', function (button) {
			if (button.index === 0) {
				this.scene.resume('GameScene');
				this.scene.stop('PauseScene');
			}
		}, this);

		this.input.keyboard.on('keyup-ESC', function () {
			this.scene.resume('GameScene');
			this.scene.stop('PauseScene');
		}, this);

		// Quit Game
		this.input.gamepad.on('up', function (button) {
			if (button.index === 1) {
				this.scene.start('StartScene');
				this.scene.stop('GameScene');
			}
		}, this);

		quit.on('pointerup', function () {
			this.scene.start('StartScene');
			this.scene.stop('GameScene');
		}, this);

		// button effects
		quit.on('pointerover', function () {
			quit.tint = Math.random() * 0xffffff;
		}, this);
		quit.on('pointerout', function () {
			quit.clearTint();
		}, this);
		resume.on('pointerover', function () {
			resume.tint = Math.random() * 0xffffff;
		}, this);
		resume.on('pointerout', function () {
			resume.clearTint();
		}, this);
	}

	update () {
		this.input.update();
	}
}
