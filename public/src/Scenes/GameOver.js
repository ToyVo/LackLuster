/* global */
/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "GameOver|gameOverText" }] */

class GameOver extends Phaser.Scene {
	preload () {}

	create () {
		let gameHeight = this.sys.game.config.height;
		let gameWidth = this.sys.game.config.width;
		let background = this.add.graphics();
		background.fillStyle(0x000000, 0.4);
		background.fillRect(0, 0, gameWidth, gameHeight);

		let gameOverText = this.add.text(gameWidth / 2, gameHeight / 2 - 250, 'Game Over', {
			fontFamily: 'font1',
			fontSize: '85px',
			fill: '#dddddd',
			align: 'center'
		}).setOrigin(0.5, 0.5).setDepth(1);

		let retryText = this.add.text(gameWidth / 2, gameHeight / 2 + 100, 'Retry?', {
			fontFamily: 'font1',
			fill: '#dddddd',
			align: 'center'
		}).setInteractive().setOrigin(0.5, 0.5).setDepth(1);

		retryText.on('pointerover', function () {
			retryText.tint = Math.random() * 0xffffff;
		}, this);
		retryText.on('pointerout', function () {
			retryText.clearTint();
		}, this);
		retryText.on('pointerup', function () {
			// Ideally here we would have a checkpoint we could load or a way to detect
			// And run different scenes based off progression
			this.scene.start('GameScene');
		}, this);

		this.input.gamepad.on('up', function () {
			this.scene.start('GameScene');
		}, this);
	}

	update () {
		this.input.update();
	}
}
